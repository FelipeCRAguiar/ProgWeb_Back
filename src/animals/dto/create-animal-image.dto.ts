import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalImageDto {
    @ApiProperty({
        example: 'https://exemplo.com/imagem-rea.jpg',
        description: 'URL da imagem do animal'
    })
    @IsString()
    @IsNotEmpty()
    @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
    imageUrl: string;
}