import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DepartmentRoutes } from '../modules/department/department.route';
import { EmployeeRoutes } from '../modules/employee/employee.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
   // ... routes
   {
      path: '/user',
      routes: UserRoutes,
   },
   {
      path: '/auth',
      routes: AuthRoutes,
   },
   {
      path: '/employee',
      routes: EmployeeRoutes,
   },
   {
      path: '/department',
      routes: DepartmentRoutes,
   },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
