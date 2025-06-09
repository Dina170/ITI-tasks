import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, Max, Min } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @Min(18)
    @Max(60)
    age: number;
    
    @ApiProperty()
    salary: number;
}

export class UpdateEmployeeDto {
    @ApiProperty({ required: false })
    @IsNotEmpty()
    name?: string;

    @ApiProperty({ required: false })
    @Min(18)
    @Max(60)
    age?: number;
    
    @ApiProperty({ required: false })
    salary?: number;
}