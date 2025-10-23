import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
   IEmployee,
   IPaginatedEmployees,
   IQueryEmployee,
} from './employee.interface';
import { Employee } from './employee.model';

const createEployee = async (payload: IEmployee): Promise<IEmployee | null> => {
   const existUser = await User.findOne({ email: payload.email });
   if (existUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Employee already exist');
   }
   const randPassword = Math.random().toString(36).slice(-8);
   const hashPassword = await bcrypt.hashSync(
      randPassword,
      config.bcrypt_salt_rounds
   );
   const newUser = new User({
      name: payload.name,
      email: payload.email,
      password: hashPassword,
      avatar: payload.avatar || '',
   });
   const savedUser = await newUser.save();
   const empId = Math.floor(Math.random() * 10);
   const newEmployee = new Employee({
      userId: savedUser?._id,
      departmentId: payload.departmentId,
      employeeId: `emp-${empId}`,
      dob: payload.dob,
      gender: payload.gender,
      maritialStatus: payload.maritialStatus,
      designation: payload.designation,
      salary: payload.salary,
      address: payload.address,
      phone: payload.phone,
      joinDate: payload.joinDate,
   });
   const result = await newEmployee.save();
   return result;
};

const getAllEmployee = async (
   query: IQueryEmployee
): Promise<IPaginatedEmployees> => {
   const page = query.page && query.page > 0 ? query.page : 1;
   const limit = query.limit && query.limit > 0 ? query.limit : 10;
   const skip = (page - 1) * limit;
   const searchFilter = query.search
      ? {
           $or: [
              { employeeId: new RegExp(query.search, 'i') },
              { phone: new RegExp(query.search, 'i') },
           ],
        }
      : {};
   const total = await Employee.countDocuments(searchFilter);
   const data = await Employee.find(searchFilter)
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name')
      .populate('departmentId', 'name');
   const totalPages = Math.ceil(total / limit);
   return {
      data,
      total,
      page,
      totalPages,
      limit,
   };
};

const updateEmployee = async (
   payload: IEmployee
): Promise<IEmployee | null> => {
   if (!payload._id) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Employee id required');
   }
   const findEmployeeData = await Employee.findById({ _id: payload._id });
   if (!findEmployeeData) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Employe Data Not Found');
   }
   const UserDataUpdate = await User.findByIdAndUpdate(
      findEmployeeData.userId,
      { name: payload.name },
      { new: true }
   );
   const EmployeeDataUpdate = await Employee.findByIdAndUpdate(
      findEmployeeData._id,
      {
         departmentId: payload.departmentId,
         designation: payload.designation,
         phone: payload.phone,
         salary: payload.salary,
         address: payload.address,
         maritialStatus: payload.maritialStatus,
         avatar: '',
      }
   );
   if (!UserDataUpdate && !EmployeeDataUpdate) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Employee Update Faield');
   }
   return payload;
};

export const EmployeeServices = {
   createEployee,
   getAllEmployee,
   updateEmployee,
};
