import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number, profile?: string, status?: string) {
    const pageNumber = page > 0 ? page : 1
    const limitNumber = limit > 0 ? limit : 10
    const skip = (pageNumber - 1) * limitNumber

    const where: any = {}

    if (profile) {
      if (profile !== 'ADOTANTE' && profile !== 'VOLUNTARIO' && profile !== 'ADMIN') {
        throw new BadRequestException('Perfil inválido')
      }
      where.profile = profile
    }

    if (status) {
      if (status !== 'ATIVO' && status !== 'INATIVO') {
        throw new BadRequestException('Status inválido')
      }
      where.status = status
    }

    return await this.prisma.user.findMany({
      skip,
      take: limitNumber,
      where,
      omit: { password: true }
    })
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true }
    })

    if(!user) {
      throw new NotFoundException('Usuário não cadastrado')
    }

    return user
  }

    async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      omit: { password: true }
    })

    if(!user) {
      throw new NotFoundException('Usuário não cadastrado')
    }

    return user
  }

  async updateRole(id: number, updateUserDto: UpdateUserDto) {
    if(!updateUserDto.profile) {
      throw new BadRequestException('Perfil inválido')
    }

    await this.findOne(id)

    return await this.prisma.user.update({
      where: { id },
      data: { profile: updateUserDto.profile },
      omit: { password: true }
    })
  }

    async updateMe(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByEmail(email)

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        username: updateUserDto.username,
        phone: updateUserDto.phone,
        birthday: updateUserDto.birthday ? new Date(updateUserDto.birthday) : undefined
      },
      omit: { password: true }
    })
  }

  async removeMe(email: string) {
    const user = await this.findByEmail(email)

    await this.prisma.user.update({
      where: { id: user.id },
      data: { status: 'INATIVO' }
    })
  }
}