import { Module } from '@nestjs/common';
import { RaceService } from './race.service.js';
import { RaceController } from './race.controller.js';

@Module({
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}
