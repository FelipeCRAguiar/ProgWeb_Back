import { PickType } from '@nestjs/mapped-types';
import { CreateAdoptionDto } from './create-adoption.dto.js';

export class UpdateAdoptionStatusDto extends PickType(CreateAdoptionDto, ['status'] as const) {}