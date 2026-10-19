import { PartialType } from '@nestjs/swagger';
import { CreateShelterDto } from './create-shelter.dto.js';

export class UpdateShelterDto extends PartialType(CreateShelterDto) {}
