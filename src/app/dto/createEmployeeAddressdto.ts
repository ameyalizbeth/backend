import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeAddressDto {
    @IsString()
    public name: string;

    @IsNumber()
    public age:number;
    @IsString()
    public password:string;
    @IsString()
    public departmentId: string;
    
    @IsString()
    public role: string;
    @IsString()
    public state: string;
    @IsString()
    public district: string;
}