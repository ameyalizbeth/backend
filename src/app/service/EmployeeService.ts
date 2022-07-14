
import { plainToClass } from "class-transformer";
import { getConnection, ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from 'bcrypt'
import UserNotAuthorizedException from "../exception/userNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/incorrectUsernameOrPasswoedException";
import jsonwebtoken from 'jsonwebtoken'
import { EmployeeAddress } from "../entities/EmployeeAddress";

export class EmployeeService{
    constructor(private employeerepo:EmployeeRespository){}
    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeerepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role":employeeDetails.role
          };
          const token = this.generateAuthTokens(payload);
    
          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };
    
     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      }; 
      
   async getAllEmployees(){
       
        return await this.employeerepo.getAllEmployees();
    }
//    async createEmployees(emp: any){
//         return await this.employeerepo.createEmployees(emp);
//     }

public async createEmployees(employeeDetails: any) {
    try {
        const newEmployee = plainToClass(Employee, {
            name: employeeDetails.name,
            password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
            age: employeeDetails.age,
            departmentId: employeeDetails.departmentId,
            employeeaddressId: employeeDetails.employeeaddressId
             });
        const save = await this.employeerepo.createEmployees(newEmployee);
        return save;
    } catch (err) {
        throw new HttpException(400, "Failed to create employee","unauthorized");
    }
}

public async createEmployeesAddress(employeeDetails: any) {
  try {
    const newAddress = plainToClass(EmployeeAddress, {
      state: employeeDetails.state,
      district:employeeDetails.district
       });
       const addressrepo = getConnection().getRepository(EmployeeAddress)
       const adress = await addressrepo.save(newAddress)
      const newEmployee = plainToClass(Employee, {
          name: employeeDetails.name,
          password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
          age: employeeDetails.age,
          departmentId: employeeDetails.departmentId,
          employeeaddressId: adress.id
           });
      const save = await this.employeerepo.createEmployeesAddress(newEmployee);
      return save;
  } catch (err) {
      throw new HttpException(400, "Failed to create employee","unauthorized");
  }
}
    async getOneById(id: string){
        const result = await this.employeerepo.getOneById(id);
        if(!result){
            throw new EntityNotFoundException( ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
       return result;

    }
    async updateOneById(emp: ObjectLiteral){
      const result = await this.employeerepo.updateOneById(emp);
        if(!result){
          throw new EntityNotFoundException( ErrorCodes.USER_WITH_ID_NOT_FOUND);
      }
     return result;

    }
    async removeOneById(id:string){
        const result = await this.employeerepo.removeOneById(id);
        if(!result){
          throw new EntityNotFoundException( ErrorCodes.USER_WITH_ID_NOT_FOUND);
      }
     return result;

    }
    
}