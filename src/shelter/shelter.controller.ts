import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe } from '@nestjs/common';
import { ShelterService } from './shelter.service.js';
import { CreateShelterDto } from './dto/create-shelter.dto.js';
import { UpdateShelterDto } from './dto/update-shelter.dto.js';

@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Post()
  create(@Body() createShelterDto: CreateShelterDto) {
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


  @Get(':id/visiting-hours')
    async getVisitingHours(@Param('id', ParseIntPipe) id: number){
      return this.shelterService.getVisitingHours(id);
    } 

  @Get(':id/working-hours')
    async getWorkingHours(@Param('id', ParseIntPipe) id: number){
      return this.shelterService.getWorkingHours(id);
    } 

  @Put(':id/working-hours')
    async updateWorkingHours(
      @Param('id', ParseIntPipe) id: number,
      @Body()body: {workingHours: string}){
      return this.shelterService.updateWorkingHours(id, body);
    }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShelterDto: UpdateShelterDto) {
    return this.shelterService.update(id, updateShelterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shelterService.remove(id);
  }
}
