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
      throw new HttpException('O abrigo já está cadastrado', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.shelter.create({
      data: {...createShelterDto},
    });
    
  }

  async findAll() {
    return await this.prisma.shelter.findMany();
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
    return await this.prisma.shelter.update({
      where: { id: id },
      data: {...updateShelterDto},
    });
    
  }

  async remove(id: number) {
    try {
    const shelter = await this.prisma.shelter.delete({
      where: { id: id }
    });
    } catch (error: any) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Abrigo ${id} não encontrado`);
        }
        throw new HttpException('Erro ao deletar o abrigo', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}
