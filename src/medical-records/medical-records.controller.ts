import { Controller, Get, Post, Put, Delete, Body, Param, Query, ValidationPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service.js';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto.js';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { RolesGuard } from '../modules/auth/roles.guard.js';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['VOLUNTARIO', 'ADMIN'])
  @Post()
  create(@Body(ValidationPipe) createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto)
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRecordsService.findOne(+id)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Put(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalRecordsService.remove(+id)
  }

  @UseGuards(AuthGuard)
  @Get(':animalId/animals')
  findByAnimal(
    @Param('animalId') animalId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    return this.medicalRecordsService.findByAnimal(
      +animalId,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10
    )
  }
}