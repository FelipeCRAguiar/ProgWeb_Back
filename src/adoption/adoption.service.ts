import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto.js';
import { UpdateAdoptionDto } from './dto/update-adoption.dto.js';
import { AdoptionStatus } from '../generated/prisma/enums.js'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class AdoptionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAdoptionDto: CreateAdoptionDto) {
    const user = await this.prisma.user.findFirst({
      where: { id: createAdoptionDto.userId }
    })

    if(!user) {
      throw new NotFoundException('Usuario inexistente')
    }

    const adoptionByUser = await this.prisma.adoption.findFirst({
      where: {
        userId: createAdoptionDto.userId,
        status: {
          in: ['PENDENTE', 'EM_ANALISE']
        }
      }
    })

    if(adoptionByUser) {
      throw new ConflictException('Usuario ja possui uma adocao em andamento')
    }

    const animal = await this.prisma.animal.findFirst({
      where: { id: createAdoptionDto.animalId }
    })

    if(!animal) {
      throw new NotFoundException('Animal Inexistente')
    } else if(animal.status !== 'DISPONIVEL') {
      throw new ConflictException('Animal ja esta em processo de adocao')
    }

    await this.prisma.animal.update({
      where: { id: animal.id },
      data: { status: 'EM_PROCESSO' }
    })

    return await this.prisma.adoption.create({
      data: {
        ...createAdoptionDto,
        adoptionDate: new Date(createAdoptionDto.adoptionDate)}
    });
  }

  async findAll(page: number, limit: number, status?: AdoptionStatus) {
    const pageNumber = page > 0 ? page : 1
    const limitNumber = limit > 0 ? limit : 1
    const skip = (pageNumber - 1) * limitNumber

    const where: any = {};
    if(status) {
      where.status = {
        contains: status,
        mode: 'insensitive',
      }
    }

    return await this.prisma.adoption.findMany({
      skip,
      take: limit,
      where
    });
  }

  async findOne(id: number) {
    const adoption = await this.prisma.adoption.findFirst({
      where: { id }
    });

    if(!adoption) {
      throw new NotFoundException('Adocao inexistente')
    }

    return adoption
  }

  async update(id: number, updateAdoptionDto: UpdateAdoptionDto) {
    const adoption = await this.prisma.adoption.findFirst({
      where: { id }
    });

    if(!adoption) {
      throw new NotFoundException('Adocao inexistente')
    }

    if(updateAdoptionDto.status === 'APROVADO') {
      await this.prisma.animal.update({
        where: { id: adoption.animalId },
        data: { status: 'ADOTADO' }
      })
    }

    return await this.prisma.adoption.update({
      where: { id },
      data: { ...updateAdoptionDto }
    })
  }

  async remove(id: number) {
    const adoption = await this.prisma.adoption.findFirst({
      where: { id }
    });

    if(!adoption) {
      throw new NotFoundException('Raca inexistente')
    }

    await this.prisma.adoption.delete({
      where: { id }
    })
  }

  async getFromUser(email: string) {
    return this.prisma.adoption.findMany({
      where: {
        user: {
          email
        }
      }
    })
  }

  async getFromShelter(id: number) {
    const shelter = this.prisma.shelter.findFirst({
      where: { id }
    })

    if(!shelter) {
      throw new NotFoundException('Abrigo inexistente')
    }

    return this.prisma.adoption.findMany({
      where: {
        animal : {
          shelter: {
            id: id
          }
        }
      },
      include: {
        animal: true
      }
    })
  }

  async patchObservation(id: number, observation: string) {
    const adoption = await this.prisma.adoption.findFirst({
      where: { id }
    });

    if(!adoption) {
      throw new NotFoundException('Adocao inexistente')
    }

    return await this.prisma.adoption.update({
      where: { id },
      data: { observation: observation }
    })
  }
}
