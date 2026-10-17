import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RaceModule } from './race/race.module.js';
import { AdoptionModule } from './adoption/adoption.module.js';

@Module({
  imports: [PrismaModule, RaceModule, AdoptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
