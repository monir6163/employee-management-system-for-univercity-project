import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { DepartmentController } from './department.controller';
import { DepartMentValidation } from './department.validation';

const router = express.Router();

router.post(
   '/create-department',
   auth('admin'),
   validateRequest(DepartMentValidation.departmentZodSchema),
   DepartmentController.createDepartment
);

router.get(
   '/all-departments',
   auth('admin'),
   DepartmentController.getAllDepartment
);

router.patch(
   '/update-department',
   auth('admin'),
   validateRequest(DepartMentValidation.departmentUpdateZodSchema),
   DepartmentController.updateDepartment
);

router.delete(
   '/delete-department/:_id',
   auth('admin'),
   validateRequest(DepartMentValidation.departmentDeleteZodSchema),
   DepartmentController.deleteDepartment
);

export const DepartmentRoutes = router;
