import { Module } from '@nestjs/common';
import { RaceService } from './race.service.js';
import { RaceController } from './race.controller.js';
import { AuthModule } from '../modules/auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}
