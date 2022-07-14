import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { DepartmentRespository } from "../repository/DepartmentRepository";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";
import { CreateDepartmentDto } from "../dto/createDepartmet";
import { UpdateDepartmentDto } from "../dto/updateDepartmentDto";


export class DepartmentService{
   
    constructor(private departmentrepo:DepartmentRespository){}
    async getAllDepartment(){
       
        return await this.departmentrepo.getAllDepartment();
    }
    async createDepartment(deptDetails:CreateDepartmentDto){
        try {
            const newdept = plainToClass(Department, {
                name: deptDetails.dept_name,
                
                 });
            const save = await this.departmentrepo.createDepartment(newdept);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee","unauthorized");
        }
       
       
    }
    async updateDepartment(deptDetails: UpdateDepartmentDto){
       
        try {
            const newdept = plainToClass(Department, {
                id:deptDetails.id,
                name: deptDetails.dept_name,
                
                 });
                 const result = await this.departmentrepo.getoneDepartment(newdept.id)
                 if(!result){
                     throw new EntityNotFoundException( ErrorCodes.DEPT_WITH_ID_NOT_FOUND);
                 }
            const save = await this.departmentrepo.updateDepartment(newdept);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee","unauthorized");
        }
    }
    async deleteDepartment(id:string){
       
        const result = await this.departmentrepo.getoneDepartment(id)
        if(!result){
            throw new EntityNotFoundException( ErrorCodes.DEPT_WITH_ID_NOT_FOUND);
        }
        const employees = await this.departmentrepo.getemployeeOfDepartment(id)
        if(employees){
            throw new EntityNotFoundException( ErrorCodes.FOREIGN_KEY);
        }
       return await this.departmentrepo.deleteDepartment(result)
    }
    async getoneDepartment(id:string){
       
        const result = await this.departmentrepo.getoneDepartment(id);
        if(!result){
            throw new EntityNotFoundException( ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
       return result;
    }
}