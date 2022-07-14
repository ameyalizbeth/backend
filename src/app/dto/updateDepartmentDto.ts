import { IsNumber, IsString } from "class-validator";

export class UpdateDepartmentDto {
    @IsString()
    public id: string;

    @IsString()
    public dept_name: string;

    
}