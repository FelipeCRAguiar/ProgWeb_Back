import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service.js';
import { ShelterController } from './shelter.controller.js';

@Module({
  controllers: [ShelterController],
  providers: [ShelterService],
})
export class ShelterModule {}
