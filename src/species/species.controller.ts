import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SpeciesService } from './species.service.js';
import { CreateSpeciesDto } from './dto/create-species.dto.js';
import { UpdateSpeciesDto } from './dto/update-species.dto.js';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}
  
  @Post()
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }
 
  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('name') name?: string,
    @Query('active') active?: string,
  ) {
    return await this.speciesService.findAll({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      name,
      active: active !== undefined ? active === 'true' : undefined,
    });
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }
}
