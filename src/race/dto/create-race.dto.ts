import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Size } from '../../generated/prisma/enums.js'

export class CreateRaceDto {
    @ApiProperty({example: 'labrador', description: 'Nome da nova raca'})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({example: 'PEQUENO', description: 'Tamanho da raca', enum: Size})
    @IsEnum(Size)
    size: Size

    @ApiProperty({example: 1, description: 'Id da especie no banco'})
    @IsNumber()
    @IsNotEmpty()
    speciesId: number
}
