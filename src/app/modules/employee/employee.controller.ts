import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IEmployee } from './employee.interface';
import { EmployeeServices } from './employee.services';

const getAllEmployee = catchAsync(async (req: Request, res: Response) => {
   const result = await EmployeeServices.getAllEmployee();
   sendResponse<IEmployee[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Employee fetch successfully..!!',
      data: result,
   });
});
const createEmployee = catchAsync(async (req: Request, res: Response) => {
   const result = await EmployeeServices.createEployee(req.body);
   sendResponse<IEmployee>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Employee Create successfully..!!',
      data: result,
   });
});

export const EmployeeController = {
   getAllEmployee,
   createEmployee,
};
