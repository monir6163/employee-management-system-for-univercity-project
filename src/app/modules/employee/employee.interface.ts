import { Model, Types } from 'mongoose';

export type IEmployee = {
   userId: Types.ObjectId;
   departmentId: Types.ObjectId;
   name: string;
   email: string;
   password: string;
   employeeId: string;
   avatar: string;
   dob: Date;
   gender: string;
   maritialStatus: string;
   designation: string;
   salary: number;
   address: string;
   phone: string;
   joinDate: Date;
};

export type IQueryEmployee = {
   page?: number;
   limit?: number;
   search?: string;
};

export type IPaginatedEmployees = {
   data: IEmployee[];
   total: number;
   page: number;
   totalPages: number;
   limit: number;
};

export type EmployeeModel = Model<IEmployee, Record<string, unknown>>;
