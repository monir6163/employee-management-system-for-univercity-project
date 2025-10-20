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
      ? { employeeId: { $regex: query.search, $options: 'i' } }
      : {};
   const total = await Employee.countDocuments(searchFilter);
   const data = await Employee.find(searchFilter).skip(skip).limit(limit);
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
   const result = payload;
   return result;
};

export const EmployeeServices = {
   createEployee,
   getAllEmployee,
   updateEmployee,
};
