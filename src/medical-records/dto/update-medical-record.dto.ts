import { PartialType } from '@nestjs/swagger'
import { CreateMedicalRecordDto } from './create-medical-record.dto.js'

export class UpdateMedicalRecordDto extends PartialType(CreateMedicalRecordDto) {}