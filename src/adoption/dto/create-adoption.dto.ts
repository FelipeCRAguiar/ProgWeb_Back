import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateAdoptionDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    animalId: number

    @IsString()
    @IsOptional()
    status?: string

    @IsString()
    @IsOptional()
    observation?: string

    @IsDate()
    @Type(() => Date)
    adoptionDate: Date
}
