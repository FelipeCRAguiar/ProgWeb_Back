import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(page: number, limit: number, animalId?: number, type?: string) {
    const pageNumber = page > 0 ? page : 1
    const limitNumber = limit > 0 ? limit : 10
    const skip = (pageNumber - 1) * limitNumber

    const where: any = {}

    if (animalId) {
      where.animalId = animalId
    }

    if (type) {
      if (type !== 'VACINA' && type !== 'CONSULTA' && type !== 'CASTRACAO' && type !== 'EXAME') {
        throw new BadRequestException('Tipo inválido')
      }
      where.type = type
    }

    return await this.prisma.medicalRecord.findMany({
      skip,
      take: limitNumber,
      where
    })
  }
}