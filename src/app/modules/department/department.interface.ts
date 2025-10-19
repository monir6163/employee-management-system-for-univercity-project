import { Model, Types } from 'mongoose';

export type IDepartment = {
   userId: Types.ObjectId;
   _id: Types.ObjectId;
   name: string;
};
export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;
