import { PartialType } from '@nestjs/swagger';
import { CreateRaceDto } from './create-race.dto.js';

export class UpdateRaceDto extends PartialType(CreateRaceDto) {}
