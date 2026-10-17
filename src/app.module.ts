import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { VisitsModule } from './visits/visits.module.js';
import { DonationsModule } from './donations/donations.module.js';


@Module({
  imports: [PrismaModule, VisitsModule, DonationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
