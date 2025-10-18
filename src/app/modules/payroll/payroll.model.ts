import mongoose, { Schema, model } from 'mongoose';
import { IPayroll, PayrollModel } from './payroll.interface';

const payrollSchema = new Schema<IPayroll>(
   {
      employee: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Employee',
      },
      month: {
         type: String,
      },
      basicSalary: {
         type: Number,
      },
      deductions: {
         type: Number,
      },
      bonuses: {
         type: Number,
      },
      netSalary: {
         type: Number,
      },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export const Payroll = model<IPayroll, PayrollModel>('Leave', payrollSchema);
