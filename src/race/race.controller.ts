import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { RaceService } from './race.service.js';
import { CreateRaceDto } from './dto/create-race.dto.js';
import { UpdateRaceDto } from './dto/update-race.dto.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { RolesGuard } from '../modules/auth/roles.guard.js';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Post()
  create(@Body(ValidationPipe) createRaceDto: CreateRaceDto) {
    return this.raceService.create(createRaceDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('name') name?: string
  ) {
    return this.raceService.findAll(
      page? Number(page) : 1,
      limit? Number(limit) : 10,
      name
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateRaceDto: UpdateRaceDto) {
    return this.raceService.update(+id, updateRaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceService.remove(+id);
  }
}
