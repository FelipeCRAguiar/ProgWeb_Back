import { Controller, Get, Post, Body, Query, ValidationPipe } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service.js';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto.js';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  create(@Body(ValidationPipe) createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto)
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('animalId') animalId?: string,
    @Query('type') type?: string
  ) {
    return this.medicalRecordsService.findAll(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      animalId ? Number(animalId) : undefined,
      type
    )
  }
}