/**
 * Wraps Controllers for easy import from other modules
 */
import { EmployeeRespository } from "../repository/EmployeeRepository";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";

import {EmployeeService} from "../service/EmployeeService"

export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
 
];
