import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service.js';
import { AdoptionController } from './adoption.controller.js';
import { AuthModule } from '../modules/auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
