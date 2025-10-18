import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { EmployeeController } from './employee.controller';
import { EmployeeValidation } from './employee.validation';

const router = express.Router();

router.post(
   '/create-employee',
   auth('admin'),
   validateRequest(EmployeeValidation.createEmployeeZodSchema),
   EmployeeController.createEmployee
);
router.get(
   '/get-all-employee',
   auth('admin'),
   EmployeeController.getAllEmployee
);

export const EmployeeRoutes = router;
