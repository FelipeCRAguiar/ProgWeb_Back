import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RaceService } from './race.service.js';
import { CreateRaceDto } from './dto/create-race.dto.js';
import { UpdateRaceDto } from './dto/update-race.dto.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { RolesGuard } from '../modules/auth/roles.guard.js';

@ApiTags('Racas')
@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @ApiBearerAuth()
  @Post()
  @ApiOperation({summary: 'Criar raca no banco'})
  create(@Body(ValidationPipe) createRaceDto: CreateRaceDto) {
    return this.raceService.create(createRaceDto);
  }

  @Get()
  @ApiOperation({summary: 'Pegar todas as racas'})
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'name', required: false, example: 'labrador' })
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
  @ApiOperation({summary: 'Pagar uma raca pelo id'})
  findOne(@Param('id') id: string) {
    return this.raceService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({summary: 'Atualizar uma raca'})
  update(@Param('id') id: string, @Body(ValidationPipe) updateRaceDto: UpdateRaceDto) {
    return this.raceService.update(+id, updateRaceDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({summary: 'Deletar uma raca'})
  remove(@Param('id') id: string) {
    return this.raceService.remove(+id);
  }
}
