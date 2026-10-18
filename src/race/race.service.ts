import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto.js';
import { UpdateRaceDto } from './dto/update-race.dto.js';
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class RaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRaceDto: CreateRaceDto) {
    const species = await this.prisma.species.findFirst({
      where: {id: createRaceDto.speciesId}
    })

    if(!species) {
      throw new BadRequestException('speciesId inválido')
    }

    const race = await this.prisma.race.findFirst({
      where: {name: createRaceDto.name}
    })

    if(race) {
      throw new BadRequestException('Raça já existente')
    }

    return this.prisma.race.create({
      data: {...createRaceDto}
    })
  }

  async findAll(page: number, limit: number, name?: string) {
    const pageNumber = page > 0 ? page : 1
    const limitNumber = limit > 0 ? limit : 1
    const skip = (pageNumber - 1) * limitNumber

    const where: any = {};

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    return await this.prisma.race.findMany({
      skip,
      take: limit,
      where
    })
  }

  async findOne(id: number) {
    const race = await this.prisma.race.findFirst({
      where: { id }
    });

    if(!race) {
      throw new NotFoundException('Raca inexistente')
    }

    return race
  }

  async update(id: number, updateRaceDto: UpdateRaceDto) {
    const race = await this.prisma.race.findFirst({
      where: { id }
    });

    if(!race) {
      throw new NotFoundException('Raca inexistente')
    }

    return await this.prisma.race.update({
      where: { id },
      data: { ...updateRaceDto }
    })
  }

  async remove(id: number) {
    const race = await this.prisma.race.findFirst({
      where: { id }
    });

    if(!race) {
      throw new NotFoundException('Raca inexistente')
    }

    await this.prisma.race.delete({
      where: { id }
    })
  }
}
