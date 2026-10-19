import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service.js';
import { SpeciesController } from './species.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
