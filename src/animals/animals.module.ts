import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service.js';
import { AnimalsController } from './animals.controller.js';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
