import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto.js';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto.js';
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

    async findOne(id: number) {
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id }
    })

    if(!record) {
      throw new NotFoundException('Registro médico não cadastrado')
    }

    return record
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    await this.findOne(id)

    if (updateMedicalRecordDto.animalId) {
      const animal = await this.prisma.animal.findUnique({
        where: { id: updateMedicalRecordDto.animalId }
      })

      if(!animal) {
        throw new NotFoundException('Animal não cadastrado')
      }
    }

    return this.prisma.medicalRecord.update({
      where: { id },
      data: {
        ...updateMedicalRecordDto,
        date: updateMedicalRecordDto.date ? new Date(updateMedicalRecordDto.date) : undefined
      }
    })
  }
      async remove(id: number) {
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id }
    })

    if(!record) {
      throw new NotFoundException('Registro médico não cadastrado')
    }

    await this.prisma.medicalRecord.delete({
      where: { id }
    })
  }
    async findByAnimal(animalId: number, page: number, limit: number) {
    const animal = await this.prisma.animal.findUnique({
      where: { id: animalId }
    })

    if(!animal) {
      throw new NotFoundException('Animal não cadastrado')
    }

    const pageNumber = page > 0 ? page : 1
    const limitNumber = limit > 0 ? limit : 10
    const skip = (pageNumber - 1) * limitNumber

    return this.prisma.medicalRecord.findMany({
      skip,
      take: limitNumber,
      where: { animalId }
    })
  }
}