import mongoose, { Schema, model } from 'mongoose';
import { AttendanceModel, IAttendance } from './attendance.interface';

const attendanceSchema = new Schema<IAttendance>(
   {
      employee: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Employee',
      },
      date: {
         type: Date,
         default: Date.now(),
      },
      checkIn: String,
      checkOut: String,
      status: {
         type: String,
         enum: ['Present', 'Absent', 'Leave'],
         default: 'Present',
      },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export const Attendance = model<IAttendance, AttendanceModel>(
   'Attendance',
   attendanceSchema
);
