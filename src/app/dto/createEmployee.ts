

import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    public name: string;
    @IsString()
    public employeeid: string;
    @IsString()
    public address: string;
    @IsString()
    @IsOptional()
    public password:string;
    @IsString()
    public status: string;
    @IsString()
    public role: string;
    @IsString()
    public experience: string;
    @IsString()
    public email: string;
    @IsString()
    public joiningDate: string;
}