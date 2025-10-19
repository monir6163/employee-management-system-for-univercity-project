import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Employee } from '../employee/employee.model';
import {
   IDepartment,
   IPaginatedDepartments,
   IQuery,
} from './department.interface';
import { Department } from './department.model';

const createDepartment = async (
   payload: IDepartment
): Promise<IDepartment | null> => {
   const isExistDpt = await Department.findOne({ name: payload.name });
   if (isExistDpt) {
      throw new ApiError(StatusCodes.CONFLICT, 'Department name already exist');
   }
   const result = await Department.create(payload);
   return result;
};

const getAllDepartment = async (
   query: IQuery
): Promise<IPaginatedDepartments> => {
   const page = query.page && query.page > 0 ? query.page : 1;
   const limit = query.limit && query.limit > 0 ? query.limit : 10;
   const skip = (page - 1) * limit;

   const searchFilter = query.search
      ? { name: { $regex: query.search, $options: 'i' } }
      : {};
   const total = await Department.countDocuments(searchFilter);
   const data = await Department.find(searchFilter).skip(skip).limit(limit);

   const totalPages = Math.ceil(total / limit);

   return {
      data,
      total,
      page,
      totalPages,
      limit,
   };
};

const updateDepartment = async (
   payload: IDepartment
): Promise<IDepartment | null> => {
   if (!payload._id) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Department ID is required');
   }
   const result = await Department.findByIdAndUpdate(
      payload._id,
      {
         name: payload.name,
      },
      { new: true, runValidators: true }
   );
   if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Department Update Faield');
   }
   return result;
};

const deleteDepartment = async (
   payload: IDepartment
): Promise<IDepartment | null> => {
   if (!payload._id) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Department id is required');
   }
   const employee = await Employee.findOne({ departmentId: payload._id });
   if (employee) {
      throw new ApiError(
         StatusCodes.FORBIDDEN,
         'Cannot delete department with existing employees'
      );
   }
   const result = await Department.findByIdAndDelete(payload._id);
   if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Department Delete Faield');
   }
   return result;
};

export const departmentServices = {
   createDepartment,
   getAllDepartment,
   updateDepartment,
   deleteDepartment,
};
