import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service.js';
import { SpeciesController } from './species.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../modules/auth/auth.module.js';


@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
