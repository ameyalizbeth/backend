import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import {EmployeeService} from "../service/EmployeeService"
import validationMiddleware from "../middleware/postmiddleware";
import { CreateEmployeeDto } from "../dto/createEmployee";
import { CreateEmployeeAddressDto } from "../dto/createEmployeeAddressdto";
import authorize from "../middleware/Authorize";
import { UpdateEmployeeDto } from "../dto/updateEmployeeDto";
enum Roles {
  ADMIN="admin", HR="hr", ENGINEER="engineer", MANAGER="manager",
}
class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
   
    this.router.get(`${this.path}/:id`, authorize(Object.values(Roles)),this.getOneById)
    this.router.get(`${this.path}`,authorize(Object.values(Roles)),this.getAllEmployees)
    this.router.post(`${this.path}`,authorize([Roles.ADMIN,Roles.HR]),validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body), this.createEmployees)
    this.router.post(`${this.path}/address`,authorize([Roles.ADMIN,Roles.HR]),validationMiddleware(CreateEmployeeAddressDto,APP_CONSTANTS.body), this.createEmployeesAddress)
    this.router.put(`${this.path}`, authorize([Roles.ADMIN,Roles.HR]),validationMiddleware(UpdateEmployeeDto,APP_CONSTANTS.body),this.updateOneById)
    this.router.delete(`${this.path}/:id`, authorize([Roles.ADMIN,Roles.HR]),this.removeOneById)
    this.router.post(
      `${this.path}/login`,
      this.login
    );
   
   
  }
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try{
      const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name.toLowerCase(), // not necessary to add lowercase
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
    }
    catch(err){
      next(err)
    }
    
  };
  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      response.status(200);
      response.send(await this.employeeService.getAllEmployees());
    } catch (error) {
      return next(error);
    }
  }
  private createEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      response.status(200);
      response.send(await this.employeeService.createEmployees(request.body));
    } catch (error) {
      return next(error);
    }
  }
  private createEmployeesAddress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      response.status(200);
      response.send(await this.employeeService.createEmployeesAddress(request.body));
    } catch (error) {
      return next(error);
    }
  }
  private getOneById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      response.status(200);
      response.send(await this.employeeService.getOneById(request.params.id));
    } catch (error) {
      return next(error);
    }
  }
  private updateOneById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Controller"};
      response.status(200);
      response.send(await this.employeeService.updateOneById(request.body));
    } catch (error) {
      return next(error);
    }
  }
    private removeOneById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        const data: any = { message: "Employee Controller"};
        response.status(200);
        const Data  = await this.employeeService.removeOneById(request.params.id)
        response.send(this.fmt.formatResponse(Data,Date.now()-request.startTime,"ok",1));
      } catch (error) {
        return next(error);
      }
  }
}

export default EmployeeController;
