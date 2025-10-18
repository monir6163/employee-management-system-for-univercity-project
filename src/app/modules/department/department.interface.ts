import { Model, Types } from 'mongoose';

export type IDepartment = {
   userId: Types.ObjectId;
   name: string;
};
export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;
