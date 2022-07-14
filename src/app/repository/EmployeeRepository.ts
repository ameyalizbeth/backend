import { plainToClass } from "class-transformer";
import { getConnection, ObjectLiteral } from "typeorm";
import { CreateEmployeeDto } from "../dto/createEmployee";
import { Employee } from "../entities/Employee";
import { EmployeeAddress } from "../entities/EmployeeAddress";

export class EmployeeRespository{
   async getEmployeeByName(name: string) {
        const employeeRepo = getConnection().getRepository(Employee);
   
        const employee = await employeeRepo.findOne({
        where:{name:name}
    })
    return employee
        
    }
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.find({relations:['department','employeeaddress']});
    }
    async createEmployees(emp:Employee){
        
        const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.save(emp)
       
        
       
   }
   async createEmployeesAddress(emp:Employee){
    
    const employeeRepo = getConnection().getRepository(Employee);
    return await employeeRepo.save(emp)
   
    
   
}
   async getOneById(id:string){
    const employeeRepo = getConnection().getRepository(Employee);
   
    const employee = await employeeRepo.findOne({
        where:{id:id}
    })
    return employee
    
   
}

async updateOneById(emp:ObjectLiteral){
    const employeeRepo = getConnection().getRepository(Employee);
    const employee = await employeeRepo.findOne({
        where:{ id: emp.id}
     })
    employee.name = emp.name;
    const employeeNew = await employeeRepo.save(employee)

    return employeeNew
    
   
}

async removeOneById(id:string){
    const employeeRepo = getConnection().getRepository(Employee);
    const employee = await employeeRepo.findOne({
       where:{ id: id}
    })
    
    return await employeeRepo.remove(employee)

    
    
   
}
    }