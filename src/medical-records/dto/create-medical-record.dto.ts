import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { RecordType } from '../../generated/prisma/enums.js';

export class CreateMedicalRecordDto {
  @IsInt()
  animalId: number;

  @IsEnum(RecordType)
  type: RecordType

  @IsString()
  @IsNotEmpty()
  description: string

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  vaterinaryName: string
}