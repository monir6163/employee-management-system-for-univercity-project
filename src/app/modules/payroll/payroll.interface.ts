import { Model, Types } from 'mongoose';

export type IPayroll = {
   employee: Types.ObjectId;
   month: string;
   basicSalary: number;
   deductions: number;
   bonuses: number;
   netSalary: number;
};
export type PayrollModel = Model<IPayroll, Record<string, unknown>>;
