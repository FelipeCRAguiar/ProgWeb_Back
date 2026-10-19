import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, SetMetadata, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnimalsService } from './animals.service.js';
import { CreateAnimalDto } from './dto/create-animal.dto.js';
import { UpdateAnimalDto } from './dto/update-animal.dto.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { RolesGuard } from '../modules/auth/roles.guard.js';
import { ValidationPipe } from '@nestjs/common';
import { CreateAnimalImageDto } from './dto/create-animal-image.dto.js';

@ApiTags('Animais')
@Controller('api/animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) { }

  @Get()
  @ApiOperation({ summary: 'Listar animais cadastrados' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'especieId', required: false, example: 1 })
  @ApiQuery({ name: 'status', required: false, example: 'DISPONIVEL' })
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('especieId') especieId: string,
    @Query('status') status: string,
  ) {
    return this.animalsService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
      Number(especieId),
      status,
    );
  }

  @Get('abrigo/:abrigoId')
  @ApiOperation({ summary: 'Obter detalhes de todos os animais em um abrigo' })
  findByShelter(@Param('abrigoId', ParseIntPipe) abrigoId: number) {
    return this.animalsService.findByShelter(abrigoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um animal por ID' })
  findOne(@Param('id') id: string) {

    return this.animalsService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN', 'VOLUNTARIO'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cadastrar novo animal' })
  create(@Body(ValidationPipe) data: CreateAnimalDto) {
    return this.animalsService.create(data);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN', 'VOLUNTARIO'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Editar informações do animal' })
  update(@Param('id') id: string, @Body() data: UpdateAnimalDto) {
    return this.animalsService.update(Number(id), data);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN', 'VOLUNTARIO'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Alterar status do animal' })
  updateStatus(@Param('id') id: string, @Body() data: UpdateStatusDto) {
    return this.animalsService.updateStatus(Number(id), data.status);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover cadastro do animal' })
  remove(@Param('id') id: string) {
    return this.animalsService.remove(Number(id));
  }

  @Post(':id/images')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN', 'VOLUNTARIO'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adicionar URL de imagem ao animal' })
  addImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() createAnimalImageDto: CreateAnimalImageDto,
  ) {
    return this.animalsService.addImage(id, createAnimalImageDto);
  }  
}