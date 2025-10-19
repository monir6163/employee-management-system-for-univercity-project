import { z } from 'zod';

const departmentZodSchema = z.object({
   body: z.object({
      userId: z.string({
         required_error: 'User id is required',
      }),
      name: z.string({
         required_error: 'Department name is required',
      }),
   }),
});

const departmentUpdateZodSchema = z.object({
   body: z.object({
      userId: z.string({
         required_error: 'User id is required',
      }),
      _id: z.string({
         required_error: 'Department id is required',
      }),
      name: z.string({
         required_error: 'Department name is required',
      }),
   }),
});

const departmentDeleteZodSchema = z.object({
   params: z.object({
      _id: z.string({
         required_error: 'Department id is required',
      }),
   }),
});

export const DepartMentValidation = {
   departmentZodSchema,
   departmentUpdateZodSchema,
   departmentDeleteZodSchema,
};
