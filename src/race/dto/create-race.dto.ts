import { IsString, IsNotEmpty } from 'class-validator'

export class CreateRaceDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    size: string

    @IsString()
    @IsNotEmpty()
    speciesId: string
}
