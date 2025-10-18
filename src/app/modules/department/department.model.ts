import mongoose, { Schema, model } from 'mongoose';
import { DepartmentModel, IDepartment } from './department.interface';

const departmentSchema = new Schema<IDepartment>(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      name: {
         type: String,
         unique: true,
         required: [true, 'Department name is required'],
      },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export const Department = model<IDepartment, DepartmentModel>(
   'Department',
   departmentSchema
);
