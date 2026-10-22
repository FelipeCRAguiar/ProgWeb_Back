import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer'
import { AdoptionStatus } from '../../generated/prisma/enums.js'

export class CreateAdoptionDto {
    @ApiProperty({example: 1, description: 'Id do usuario no banco'})
    @IsNumber()
    @IsNotEmpty()
    userId: number

    @ApiProperty({example: 1, description: 'Id do animal no banco'})
    @IsNumber()
    @IsNotEmpty()
    animalId: number

    @ApiProperty({example: 'PENDENTE', description: 'Status da adocao no sistema', required: false, enum: AdoptionStatus})
    @IsEnum(AdoptionStatus)
    @IsOptional()
    status?: AdoptionStatus

    @ApiProperty({example: 'Casa com jardim amplo e sempre com a presenca de alguem', description: 'Oservacao sobre a adocao, seja sobre o usuario, animal ou o processo em si', required: false})
    @IsString()
    @IsOptional()
    observation?: string

    @ApiProperty({example: '2026-10-22', description: 'Data que o pedido de adocao foi feito'})
    @IsDate()
    @Type(() => Date)
    adoptionDate: Date
}
