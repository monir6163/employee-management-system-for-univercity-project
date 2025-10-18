import { Model, Types } from 'mongoose';

export type IAttendance = {
   employee: Types.ObjectId;
   date: Date;
   checkIn: string;
   checkOut: string;
   status: string;
};
export type AttendanceModel = Model<IAttendance, Record<string, unknown>>;
