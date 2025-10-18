import { Model, Types } from 'mongoose';

export type ILeave = {
   employee: Types.ObjectId;
   fromDate: Date;
   toDate: Date;
   reason: string;
   status: string;
};
export type LeaveModel = Model<ILeave, Record<string, unknown>>;
