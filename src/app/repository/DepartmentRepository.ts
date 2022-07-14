import { getConnection, ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository{
    async getAllDepartment(){
         const departmentRepo = getConnection().getRepository(Department);
        return await departmentRepo.find();
    }
    async createDepartment(dept:Department){
        const departmentRepo = getConnection().getRepository(Department);
       return await departmentRepo.save(dept);
   }
   async updateDepartment(dep:ObjectLiteral){
   
    const departmentRepo = getConnection().getRepository(Department);
    const dept = await departmentRepo.findOne({
        where:{ id: dep.id}
     })
    
    dept.dept_name = dep.dept_name;
    const department = await departmentRepo.save(dept)

    return department
}
async deleteDepartment(id:string){
    const departmentRepo = getConnection().getRepository(Department);
    const dept = await departmentRepo.findOne({
        where:{ id: id}
     })
     
     return await departmentRepo.remove(dept)
 
}
async getoneDepartment(id:string){
    const departmentRepo = getConnection().getRepository(Department);
    return await departmentRepo.findOne({
        where:{id:id}
    })
   
    }
}