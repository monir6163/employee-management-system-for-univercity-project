import { z } from 'zod';

const createEmployeeZodSchema = z.object({
   body: z.object({
      departmentId: z.string({
         required_error: 'Department ID is required',
      }),
      name: z.string({
         required_error: 'Name is required',
      }),
      email: z
         .string({
            required_error: 'email is required',
         })
         .email(),
      dob: z
         .string({
            required_error: 'Dob is required',
         })
         .refine(date => !isNaN(Date.parse(date)), {
            message: 'Invalid date format',
         }),
      designation: z.string({
         required_error: 'Designation is required',
      }),
      salary: z
         .number({
            required_error: 'Salary is required',
         })
         .positive('Salary must be a positive number'),
      joinDate: z
         .string({
            required_error: 'Join date is required',
         })
         .refine(date => !isNaN(Date.parse(date)), {
            message: 'Invalid date format',
         }),
      phone: z
         .string({
            required_error: 'Phone number is required',
         })
         .min(10, 'Phone number must be at least 10 digits'),
      address: z.string({
         required_error: 'Address is required',
      }),
      gender: z.string({
         required_error: 'Gender is required',
      }),
      maritialStatus: z.string({
         required_error: 'MaritialStatus is required',
      }),
      avatar: z.string().optional(),
   }),
});

export const EmployeeValidation = {
   createEmployeeZodSchema,
};
