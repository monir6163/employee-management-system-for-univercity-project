import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IDepartment, IPaginatedDepartments } from './department.interface';
import { departmentServices } from './department.services';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
   const result = await departmentServices.createDepartment(req.body);
   sendResponse<IDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Department Created successfully..!!',
      data: result,
   });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
   const result = await departmentServices.getAllDepartment(req.query);
   sendResponse<IPaginatedDepartments | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Department fetch successfully..!!',
      data: result,
   });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
   const result = await departmentServices.updateDepartment(req.body);
   sendResponse<IDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Department Update successfully..!!',
      data: result,
   });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
   const id = req.params;
   const result = await departmentServices.deleteDepartment(
      id as unknown as IDepartment
   );
   sendResponse<IDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Department Delete successfully..!!',
      data: result,
   });
});

export const DepartmentController = {
   createDepartment,
   getAllDepartment,
   updateDepartment,
   deleteDepartment,
};
