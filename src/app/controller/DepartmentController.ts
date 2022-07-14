import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import authorize from "../middleware/Authorize";
import {DepartmentService} from "../service/DepartmentService"
import { CreateDepartmentDto } from "../dto/createDepartmet";
import validationMiddleware from "../middleware/postmiddleware";
import { UpdateDepartmentDto } from "../dto/updateDepartmentDto";
import { Roles } from "../constants/Roles";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
   
    this.router.get(`${this.path}`,authorize(Object.values(Roles)) ,this.getAllDepartment);
    this.router.get(`${this.path}/:id`,authorize(Object.values(Roles)) ,this.getoneDepartment);
    this.router.post(`${this.path}`,authorize([Roles.ADMIN,Roles.HR]) ,validationMiddleware(CreateDepartmentDto,APP_CONSTANTS.body),this.createDepartment);
    this.router.put(`${this.path}`,authorize([Roles.ADMIN,Roles.HR]) ,validationMiddleware(UpdateDepartmentDto,APP_CONSTANTS.body),this.updateDepartment);
    this.router.delete(`${this.path}/:id`,authorize([Roles.ADMIN,Roles.HR]) ,this.deleteDepartment);
  }
  private getAllDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department Controller"};
      response.status(200);
      response.send(await this.departmentService.getAllDepartment());
    } catch (error) {
      return next(error);
    }
  }
    private createDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        const data: any = { message: "Department Controller"};
        response.status(200);
        response.send(await this.departmentService.createDepartment(request.body));
      } catch (error) {
        return next(error);
      }
    }
    private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
          
          const data: any = { message: "Department Controller"};
          response.status(200);
          response.send(await this.departmentService.updateDepartment(request.body));
        } catch (error) {
          return next(error);
        }
      }
        private deleteDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
          try {
            const data: any = { message: "Department Controller"};
            response.status(200);
            response.send(await this.departmentService.deleteDepartment(request.params.id));
          } catch (error) {
            return next(error);
          }
  }

  private getoneDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Department Controller"};
      response.status(200);
      response.send(await this.departmentService.getoneDepartment(request.params.id));
    } catch (error) {
      return next(error);
    }
}
}

export default DepartmentController;
