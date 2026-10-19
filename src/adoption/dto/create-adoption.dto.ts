import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'
import { AdoptionStatus } from '../../generated/prisma/enums.js'

export class CreateAdoptionDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    animalId: number

    @IsEnum(AdoptionStatus)
    @IsOptional()
    status?: AdoptionStatus

    @IsString()
    @IsOptional()
    observation?: string

    @IsDate()
    @Type(() => Date)
    adoptionDate: Date
}
