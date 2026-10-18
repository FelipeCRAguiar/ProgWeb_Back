import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
    @ApiProperty({ example: 'ADOTADO', enum: ['DISPONIVEL', 'EM_PROCESSO', 'ADOTADO', 'INATIVO'] })
    @IsEnum(['DISPONIVEL', 'EM_PROCESSO', 'ADOTADO', 'INATIVO'])
    status: 'DISPONIVEL' | 'EM_PROCESSO' | 'ADOTADO' | 'INATIVO';
}