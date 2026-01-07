import { IsArray, IsBoolean, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    description?: string;

    @IsBoolean()
    completed!: boolean;

    @IsDateString()
    createdAt!: Date;

    @IsDateString()
    updatedAt!: Date;
    
}
