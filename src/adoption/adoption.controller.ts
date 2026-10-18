import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { AdoptionService } from './adoption.service.js';
import { CreateAdoptionDto } from './dto/create-adoption.dto.js';
import { UpdateAdoptionDto } from './dto/update-adoption.dto.js';
import { AdoptionStatus } from '../generated/prisma/enums.js'

@Controller('adoption')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post()
  create(@Body(ValidationPipe) createAdoptionDto: CreateAdoptionDto) {
    return this.adoptionService.create(createAdoptionDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: AdoptionStatus
  ) {
    return this.adoptionService.findAll(
      page? Number(page) : 1,
      limit? Number(limit) : 1,
      status
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adoptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateAdoptionDto: UpdateAdoptionDto) {
    return this.adoptionService.update(+id, updateAdoptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adoptionService.remove(+id);
  }
}
