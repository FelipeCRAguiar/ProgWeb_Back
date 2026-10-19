import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service.js';
import { ShelterController } from './shelter.controller.js';
import { AuthModule } from '../modules/auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [ShelterController],
  providers: [ShelterService],
})
export class ShelterModule {}
