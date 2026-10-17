import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service.js';
import { DonationsController } from './donations.controller.js';

@Module({
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
