import { IsString, IsNotEmpty, MaxLength, IsOptional, IsBoolean } from 'class-validator';
export class CreateSpeciesDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(254)
    description: string;

    @IsBoolean()
    @IsOptional()
    active: boolean;

}
