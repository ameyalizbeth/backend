/**
 * Wraps Controllers for easy import from other modules
 */
import { EmployeeRespository } from "../repository/EmployeeRepository";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
import DepartmentController from "./DepartmentController";
import {EmployeeService} from "../service/EmployeeService"
import { DepartmentService } from "../service/DepartmentService";
import { DepartmentRespository } from "../repository/DepartmentRepository";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
  new DepartmentController(new DepartmentService(new DepartmentRespository()))
];
