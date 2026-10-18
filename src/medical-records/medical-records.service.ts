import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MedicalRecordsService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const animal = await this.prisma.animal.findUnique({
      where: { id: createMedicalRecordDto.animalId }
    })

    if(!animal) {
      throw new NotFoundException('Animal não cadastrado')
    }

    return this.prisma.medicalRecord.create({
      data: {
        ...createMedicalRecordDto,
        date: new Date(createMedicalRecordDto.date)
      }
    })
  }
}