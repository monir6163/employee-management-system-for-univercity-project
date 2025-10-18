import mongoose, { Schema, model } from 'mongoose';
import { ILeave, LeaveModel } from './leave.interface';

const leaveSchema = new Schema<ILeave>(
   {
      employee: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Employee',
      },
      fromDate: {
         type: Date,
      },
      toDate: {
         type: Date,
      },
      reason: {
         type: String,
      },
      status: {
         type: String,
         enum: ['Pending', 'Approved', 'Rejected'],
         default: 'Pending',
      },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export const Leave = model<ILeave, LeaveModel>('Leave', leaveSchema);
