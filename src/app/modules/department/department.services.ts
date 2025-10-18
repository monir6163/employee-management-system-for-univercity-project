import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IDepartment } from './department.interface';
import { Department } from './department.model';

const createDepartment = async (
   payload: IDepartment
): Promise<IDepartment | null> => {
   console.log(payload);
   const isExistDpt = await Department.findOne({ name: payload.name });
   if (isExistDpt) {
      throw new ApiError(StatusCodes.CONFLICT, 'Department name already exist');
   }
   const result = await Department.create(payload);
   return result;
};

const getAllDepartment = async (): Promise<IDepartment[]> => {
   const result = await Department.find();
   return result;
};

export const departmentServices = {
   createDepartment,
   getAllDepartment,
};
