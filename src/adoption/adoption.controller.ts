import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, UseGuards, SetMetadata, Req } from '@nestjs/common';
import { AdoptionService } from './adoption.service.js';
import { CreateAdoptionDto } from './dto/create-adoption.dto.js';
import { UpdateAdoptionObservationDto } from './dto/update-adoption-observation.dto.js';
import { UpdateAdoptionStatusDto } from './dto/update-adoption-status.dto.js'
import { AdoptionStatus } from '../generated/prisma/enums.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { RolesGuard } from '../modules/auth/roles.guard.js';

@Controller('adoption')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @UseGuards(AuthGuard)
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

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.adoptionService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Patch('status/:id')
  updateStatus(@Param('id') id: string, @Body(ValidationPipe) updateAdoptionDto: UpdateAdoptionStatusDto) {
    return this.adoptionService.updateStatus(+id, updateAdoptionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adoptionService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get('/my-requests')
  getFromUser(@Req() request: any) {
    const user = request['user']
    return this.adoptionService.getFromUser(user.email)
  }

  @UseGuards(AuthGuard)
  @Get('shelter/:id')
  getFromShelter(@Param('id') id: string) {
    return this.adoptionService.getFromShelter(+id)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Patch('observation/:id')
  updateObservation(@Param('id') id: string, @Body(ValidationPipe) data: UpdateAdoptionObservationDto) {
    return this.adoptionService.updateObservation(+id, data)
  }
}
