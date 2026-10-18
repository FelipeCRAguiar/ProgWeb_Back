import { IsEmail, IsString, MinLength, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'Joao da Silva' })
    @IsString()
    nome: string;

    @ApiProperty({ example: 'joao@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @MinLength(6)
    senha: string;

    @ApiProperty({ example: '12345678901' })
    @IsString()
    cpf: string;

    @ApiProperty({ example: '83999999999', required: false })
    @IsString()
    @IsOptional()
    telefone?: string;

    @ApiProperty({ example: '1990-01-01' })
    @IsDateString()
    dataNascimento: string;
}