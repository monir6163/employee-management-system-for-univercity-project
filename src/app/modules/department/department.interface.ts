import { Model, Types } from 'mongoose';

export type IDepartment = {
   userId: Types.ObjectId;
   _id: Types.ObjectId;
   name: string;
};

export type IQuery = {
   page?: number;
   limit?: number;
   search?: string;
};

export type IPaginatedDepartments = {
   data: IDepartment[];
   total: number;
   page: number;
   totalPages: number;
   limit: number;
};
export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;
