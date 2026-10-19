import { PartialType } from '@nestjs/swagger';
import { CreateAdoptionDto } from './create-adoption.dto.js';

export class UpdateAdoptionDto extends PartialType(CreateAdoptionDto) {}
