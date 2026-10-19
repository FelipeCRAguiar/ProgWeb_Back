import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { AnimalsModule } from './animals/animals.module.js';
import { ShelterModule } from './shelter/shelter.module.js';
import { SpeciesModule } from './species/species.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { MedicalRecordsModule } from './medical-records/medical-records.module.js';

@Module({
  imports: [PrismaModule, ShelterModule, SpeciesModule, AnimalsModule, AuthModule, UsersModule, MedicalRecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }