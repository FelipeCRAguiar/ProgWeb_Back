import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller.js';
import { AnimalsService } from './animals.service.js';
import { AnimalsRepository } from './animals.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../modules/auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalsRepository],
})
export class AnimalsModule { }