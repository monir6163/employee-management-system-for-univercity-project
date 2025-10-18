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

export const DepartMentValidation = {
   departmentZodSchema,
};
