import mongoose, { Schema, model } from 'mongoose';
import { EmployeeModel, IEmployee } from './employee.interface';

const employeeSchema = new Schema<IEmployee>(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      departmentId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Department',
      },
      employeeId: {
         type: String,
         unique: true,
      },
      dob: {
         type: Date,
      },
      gender: {
         type: String,
         enum: ['Male', 'Female', 'Other'],
      },
      maritialStatus: {
         type: String,
         enum: ['Single', 'Married', 'Divorse'],
      },
      designation: {
         type: String,
      },
      salary: {
         type: Number,
      },
      address: {
         type: String,
      },
      phone: {
         type: String,
      },
      joinDate: {
         type: Date,
      },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export const Employee = model<IEmployee, EmployeeModel>(
   'Employee',
   employeeSchema
);
