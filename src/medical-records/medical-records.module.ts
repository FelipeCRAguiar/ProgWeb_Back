import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service.js';
import { MedicalRecordsController } from './medical-records.controller.js';
import { AuthModule } from '../modules/auth/auth.module.js';
@Module({
  imports: [AuthModule],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
})
export class MedicalRecordsModule {}