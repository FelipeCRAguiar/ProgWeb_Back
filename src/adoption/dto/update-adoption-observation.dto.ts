import { PickType } from '@nestjs/mapped-types';
import { CreateAdoptionDto } from './create-adoption.dto.js';

export class UpdateAdoptionObservationDto extends PickType(CreateAdoptionDto, ['observation'] as const) {}
