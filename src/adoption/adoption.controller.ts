import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, UseGuards, SetMetadata, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AdoptionService } from './adoption.service.js';
import { CreateAdoptionDto } from './dto/create-adoption.dto.js';
import { UpdateAdoptionObservationDto } from './dto/update-adoption-observation.dto.js';
import { UpdateAdoptionStatusDto } from './dto/update-adoption-status.dto.js'
import { AdoptionStatus } from '../generated/prisma/enums.js';
import { AuthGuard } from '../modules/auth/auth.guard.js';
import { RolesGuard } from '../modules/auth/roles.guard.js';

@ApiTags('Adocoes')
@Controller('adoption')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({summary: 'Criar pedido de adocao no banco'})
  create(@Body(ValidationPipe) createAdoptionDto: CreateAdoptionDto) {
    return this.adoptionService.create(createAdoptionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @ApiBearerAuth()
  @Get()
  @ApiOperation({summary: 'Pegar todos os pedidos de adocao'})
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'status', required: false, example: 'PENDENTE' })
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

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('one/:id')
  @ApiOperation({summary: 'Pegar um pedido de adocao em especifico'})
  findOne(@Param('id') id: string) {
    return this.adoptionService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @ApiBearerAuth()
  @Patch('status/:id')
  @ApiOperation({summary: 'Alterar o status da adocao'})
  updateStatus(@Param('id') id: string, @Body(ValidationPipe) updateAdoptionDto: UpdateAdoptionStatusDto) {
    return this.adoptionService.updateStatus(+id, updateAdoptionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({summary: 'Deletar pedido de adocao'})
  remove(@Param('id') id: string) {
    return this.adoptionService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/my-requests')
  @ApiOperation({summary: 'Pegar o historico de pedidos do usuario'})
  getFromUser(@Req() request: any) {
    const user = request['user']
    return this.adoptionService.getFromUser(user.email)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @ApiBearerAuth()
  @Get('shelter/:id')
  @ApiOperation({summary: 'Pegar todos os pedidos de adocao de um abrigo'})
  getFromShelter(@Param('id') id: string) {
    return this.adoptionService.getFromShelter(+id)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['ADMIN'])
  @ApiBearerAuth()
  @Patch('observation/:id')
  @ApiOperation({summary: 'Alterar ou adicionar uma observacao a uma adocao'})
  updateObservation(@Param('id') id: string, @Body(ValidationPipe) data: UpdateAdoptionObservationDto) {
    return this.adoptionService.updateObservation(+id, data)
  }
}
