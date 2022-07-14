import { IsNumber, IsString } from "class-validator";

export class UpdateEmployeeDto {
    @IsString()
    public id: string;
    @IsString()
    public name: string;

    @IsNumber()
    public age:number;
    @IsString()
    public password:string;
    @IsString()
    public departmentId: string;
    @IsString()
    public employeeaddressId: string;
    @IsString()
    public role: string;
}