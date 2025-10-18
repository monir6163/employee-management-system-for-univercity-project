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
export type EmployeeModel = Model<IEmployee, Record<string, unknown>>;
