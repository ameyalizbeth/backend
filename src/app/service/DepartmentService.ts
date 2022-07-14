import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { DepartmentRespository } from "../repository/DepartmentRepository";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";


export class DepartmentService{
   
    constructor(private departmentrepo:DepartmentRespository){}
    async getAllDepartment(){
       
        return await this.departmentrepo.getAllDepartment();
    }
    async createDepartment(deptDetails:any){
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
    async updateDepartment(dep: ObjectLiteral){
       
        const result = await this.departmentrepo.updateDepartment(dep);
        if(!result){
            throw new EntityNotFoundException( ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
       return result;
    }
    async deleteDepartment(id:string){
       
        const result = this.departmentrepo.deleteDepartment(id)
        if(!result){
            throw new EntityNotFoundException( ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
       return result;}
    async getoneDepartment(id:string){
       
        const result = await this.departmentrepo.getoneDepartment(id);
        if(!result){
            throw new EntityNotFoundException( ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
       return result;
    }
}