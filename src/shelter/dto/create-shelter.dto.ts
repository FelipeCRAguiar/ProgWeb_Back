import { IsString, IsNotEmpty, MaxLength, IsOptional, IsBoolean, Length, IsEmail, IsNumber, Min, Max } from 'class-validator';
export class CreateShelterDto {

    @IsString()
    @IsNotEmpty()
    name: string;   

    @Length(14, 14, {message: 'O CNPJ deve ter 14 caracteres, sem os pontos, traços ou as barras.'})
    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail({}, {message: 'Informe um email válido.'})
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0, {message: 'A capacidade não pode ser menor que 0.'})
    maxCapacity: number;

    @IsString()
    @IsNotEmpty()
    workingHours: string;

    @IsString()
    @IsNotEmpty()
    visitingHours: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0, {message: 'O limite de visitantes não pode ser negativo.'})
    atendeeLimit: number;
}
