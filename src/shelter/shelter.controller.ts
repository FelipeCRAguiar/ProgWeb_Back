import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe, ValidationPipe, SetMetadata, UseGuards } from '@nestjs/common';
import { ShelterService } from './shelter.service.js';
import { CreateShelterDto } from './dto/create-shelter.dto.js';
import { UpdateShelterDto } from './dto/update-shelter.dto.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { RolesGuard } from '../modules/auth/roles.guard.js';


@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  create(@Body(ValidationPipe) createShelterDto: CreateShelterDto) {
    return this.shelterService.create(createShelterDto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('name') name?: string,
    @Query('address') address?: string,
  ) {
    return this.shelterService.findAll({ page, limit, name, address });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shelterService.findOne(id);
  }

  @Get(':id/visiting-hours')
    async getVisitingHours(@Param('id', ParseIntPipe) id: number){
      return this.shelterService.getVisitingHours(id);
    } 

  @Get(':id/working-hours')
    async getWorkingHours(@Param('id', ParseIntPipe) id: number){
      return this.shelterService.getWorkingHours(id);
    } 

  @Get(':id/capacity')
  async getCapacity(@Param('id', ParseIntPipe) id: number) {
    return this.shelterService.getCapacity(id);
  }

  @Put(':id/working-hours')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
    async updateWorkingHours(
      @Param('id', ParseIntPipe) id: number,
      @Body(ValidationPipe)body: {workingHours: string}){
      return this.shelterService.updateWorkingHours(id, body);
    }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateShelterDto: UpdateShelterDto) {
    return this.shelterService.update(id, updateShelterDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shelterService.remove(id);
  }
}
