import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto.js';
import { UpdateShelterDto } from './dto/update-shelter.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ShelterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShelterDto: CreateShelterDto) {
    const shelter = await this.prisma.shelter.findFirst({
      where: {cnpj: createShelterDto.cnpj}
    });
    if(shelter){
      throw new HttpException('O abrigo já está cadastrado', HttpStatus.CONFLICT);
    }
    return this.prisma.shelter.create({
      data: {...createShelterDto},
    });
    
  }

  async findAll(params: { page?: number; limit?: number; name?: string; address?: string; }) {
    const page = params.page && params.page > 0 ? Number(params.page) : 1;
    const limit = params.limit && params.limit > 0 ? Number(params.limit) : 10;
    const skip = (page - 1) * limit;
    const where: any = {};
    
    if(params.name) {
      where.name = {
        contains: params.name,
        mode: 'insensitive',
      };
    }
    if(params.address) {
      where.address = {
        contains: params.address,
        mode: 'insensitive',
      };
    }
    return await this.prisma.shelter.findMany({
      skip,
      take: limit,
      where,
    });
    
  }

  async getVisitingHours(id: number) {
    const shelter = await this.prisma.shelter.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        address: true,
        visitingHours: true,
      },
    });
    if(!shelter) {
      throw new HttpException('O abrigo não está cadastrado', HttpStatus.NOT_FOUND);
    }
    return shelter;
  }   

  async getWorkingHours(id: number) {
    const shelter = await this.prisma.shelter.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        address: true,
        workingHours: true,
      },
    });
    if(!shelter) {
      throw new HttpException('O abrigo não está cadastrado', HttpStatus.NOT_FOUND);
    }
    return shelter;
  }   

  async findOne(id: number) {
    const shelter =  await this.prisma.shelter.findFirst({
      where: { id: id }
    });
    if(!shelter){
      throw new HttpException('O abrigo não está cadastrado', HttpStatus.NOT_FOUND);
    }
    return shelter;
  }

  async update(id: number, updateShelterDto: UpdateShelterDto) {
    const shelter = await this.prisma.shelter.findFirst({
      where: { id: id }
    });
    if (!shelter) {
      throw new HttpException('O abrigo não está cadastrado', HttpStatus.NOT_FOUND);
    }
    try {
      return await this.prisma.shelter.update({
        where: { id: id },
        data: {...updateShelterDto},
    });
    }catch (error: any) {
      if (error.code === 'P2002') {
        throw new HttpException('O CNPJ já pertence a outro abrigo', HttpStatus.CONFLICT);
      }
      throw new HttpException('Erro ao atualizar o abrigo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateWorkingHours(id: number, dto: { workingHours: string }) {
    try {
      return await this.prisma.shelter.update({
        where: { id: id },
        data: { workingHours: dto.workingHours },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
          throw new NotFoundException(`Abrigo ${id} não encontrado`);
        }
      throw new HttpException('Erro ao atualizar os horários de funcionamento', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
    const shelter = await this.prisma.shelter.delete({
      where: { id: id }
    });
      return{message: `O ${shelter.name} foi deletado com sucesso`};
    } catch (error: any) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Abrigo ${id} não encontrado`);
        }
        throw new HttpException('Erro ao deletar o abrigo', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}
