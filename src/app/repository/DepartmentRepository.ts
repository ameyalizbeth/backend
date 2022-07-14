import { getConnection, ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";
import { Employee } from "../entities/Employee";

export class DepartmentRespository{
    async getAllDepartment(){
         const departmentRepo = getConnection().getRepository(Department);
        return await departmentRepo.find();
    }
    async createDepartment(dept:Department){
        const departmentRepo = getConnection().getRepository(Department);
       return await departmentRepo.save(dept);
   }
   async updateDepartment(dep:Department){
   
    const departmentRepo = getConnection().getRepository(Department);
   
    const department = await departmentRepo.save(dep)

    return department
}
async deleteDepartment(dept:Department){
    const departmentRepo = getConnection().getRepository(Department);
    
     return await departmentRepo.remove(dept)
 
}
async getoneDepartment(id:string){
    const departmentRepo = getConnection().getRepository(Department);
    return await departmentRepo.findOne({
        where:{id:id}
    })
   
    }
    async getemployeeOfDepartment(id:string){
        const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.find({
            where:{departmentId:id}
        })
       
        }
}