import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number, profile?: string, status?: string) {
    const skip = (page - 1) * limit

    const where: any = {};

    if (profile) {
      where.profile = profile;
    }

    if (status) {
      where.status = status;
    }

    return await this.prisma.user.findMany({
      skip,
      take: limit,
      where,
      omit: { password: true }
    })
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      omit: { password: true }
    });

    if(!user) {
      throw new NotFoundException('Usuário não cadastrado')
    }

    return user
  }

  async updateRole(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { id }
    });

    if(!user) {
      throw new NotFoundException('Usuário não cadastrado')
    }

    return await this.prisma.user.update({
      where: { id },
      data: { profile: updateUserDto.profile },
      omit: { password: true }
    })
  }
}