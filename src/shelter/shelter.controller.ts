import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.shelterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shelterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelterDto: UpdateShelterDto) {
    return this.shelterService.update(+id, updateShelterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shelterService.remove(+id);
  }
}
