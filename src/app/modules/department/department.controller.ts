import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IDepartment } from './department.interface';
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
   const result = await departmentServices.getAllDepartment();
   sendResponse<IDepartment[] | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Department fetch successfully..!!',
      data: result,
   });
});

export const DepartmentController = {
   createDepartment,
   getAllDepartment,
};
