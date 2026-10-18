import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
    @ApiProperty({ example: 'Rex' })
    @IsString()
    nome: string;

    @ApiProperty({ example: 'MACHO', enum: ['MACHO', 'FEMEA'] })
    @IsEnum(['MACHO', 'FEMEA'])
    sexo: 'MACHO' | 'FEMEA';

    @ApiProperty({ example: '2022-05-10' })
    @IsString()
    dataNascimento: string;

    @ApiProperty({ example: 'Cão muito brincalhão', required: false })
    @IsString()
    @IsOptional()
    descricao?: string;

    @ApiProperty({ example: 1, description: 'ID da Raça' })
    @IsNumber()
    racaId: number;
}