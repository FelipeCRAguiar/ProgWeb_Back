import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty({ example: 'token_jwt_aqui' })
    @IsString()
    token: string;

    @ApiProperty({ example: 'novaSenha123' })
    @IsString()
    @MinLength(6)
    novaSenha: string;
}