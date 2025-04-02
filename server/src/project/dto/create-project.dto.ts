import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description : string;

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value)) // Converts string to Date
    @IsDate()
    startDate : Date;

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value)) // Converts string to Date
    @IsDate()
    endDate : Date;
}
