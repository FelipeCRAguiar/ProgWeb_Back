import { IsString, IsNotEmpty, IsEmail, IsOptional, IsDateString, IsEnum, Length } from 'class-validator'
import { UserProfile, UserStatus } from '../../generated/prisma/enums.js'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @Length(11, 11)
    cpf: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsDateString()
    birthday: Date

    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus

    @IsOptional()
    @IsEnum(UserProfile)
    profile?: UserProfile
}