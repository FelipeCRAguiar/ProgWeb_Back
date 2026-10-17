import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto.js';
import { UpdateSpeciesDto } from './dto/update-species.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SpeciesService {

  constructor(private readonly prisma: PrismaService) {}
  
  async create(createSpeciesDto: CreateSpeciesDto) {
    const species =  await this.prisma.species.findFirst({
      where: {name: createSpeciesDto.name}
    });
    if(species){
      throw new HttpException('A especie já está cadastrado', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.species.create({
      data: {...createSpeciesDto},
    });
  }

  async findAll(
    params: { page?: number; limit?: number; name?: string; active?: boolean }) {
      const page = params.page && params.page > 0 ? Number(params.page) : 1;
      const limit = params.limit && params.limit > 0 ? Number(params.limit) : 10;
      const skip = (page - 1) * limit;
      const where: any = {};
      if (params.name) {
        where.name = {
          contains: params.name,
          mode: 'insensitive',
        };
      }
      if (params.active !== undefined) {
        where.active = params.active;
      }
      return await this.prisma.species.findMany({
        skip,
        take: limit,
        where,
      });
    }

  async findOne(id: number) {
    const species =  await this.prisma.species.findFirst({
      where: { id }
    });
    if(!species){
      throw new HttpException('A especie não está cadastrado', HttpStatus.NOT_FOUND);
    }
    return species;
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    const species = await this.prisma.species.findFirst({
      where: { id }
    });
    if (!species) {
      throw new HttpException('A especie não está cadastrada', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.species.update({
      where: { id: id },
      data: { ...updateSpeciesDto }
    });
  }

  async remove(id: number) {
    try {
      return await this.prisma.species.delete({
        where: { id: id }
      });
    } catch (error: any) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Especie ${id} não encontrada`);
        }
        throw new HttpException('Erro ao deletar a especie', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

