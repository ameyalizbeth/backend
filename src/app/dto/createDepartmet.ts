

import { IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    public dept_name: string;

    
}