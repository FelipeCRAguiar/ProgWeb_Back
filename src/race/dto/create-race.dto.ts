import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator'
import { Size } from '../../generated/prisma/enums.js'

export class CreateRaceDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEnum(Size)
    size: Size

    @IsNumber()
    @IsNotEmpty()
    speciesId: number
}
