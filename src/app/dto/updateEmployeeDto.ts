import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateEmployeeDto {
    @IsString()
    public id: string;
    @IsString()
    public name: string;
    @IsString()
    public employeeid: string;
    @IsString()
    @IsOptional()
    public password:string
    
    @IsString()
    public address:string;
    @IsString()
    public experience: string;
    @IsString()
    public email: string;
    @IsString()
    public role: string;
    @IsString()
    public joiningDate: string;
    @IsString()
    public status: string;
}