import { IsOptional, IsString } from "class-validator";

export class UpdateCarDto {

    @IsString({ message: 'The brand must be a string' })
    @IsOptional()
    readonly brand?: string;

    @IsString({ message: 'The brand must be a string' })
    @IsOptional()
    readonly model?: string;

}