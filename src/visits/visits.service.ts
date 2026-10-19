import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { VisitStatus } from '../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateVisitDto } from './dto/create-visit.dto.js';
import { UpdateVisitDto } from './dto/update-visit.dto.js';

type VisitStatusValue = (typeof VisitStatus)[keyof typeof VisitStatus];

const normalizeVisitStatus = (status?: string): VisitStatusValue => {
  const normalized = status?.trim().toUpperCase();

  if (!normalized) return VisitStatus.AGENDADA;

  if (['AGENDADO', 'AGENDADA'].includes(normalized)) return VisitStatus.AGENDADA;
  if (['CONCLUIDO', 'CONCLUIDA', 'CONFIRMADO', 'CONFIRMADA'].includes(normalized)) return VisitStatus.CONFIRMADA;
  if (['CANCELADO', 'CANCELADA'].includes(normalized)) return VisitStatus.CANCELADA;

  throw new BadRequestException(`Status de visita inválido: ${status}`);
};

const normalizePage = (value?: number | string, fallback = 1) => {
  const page = Number(value ?? fallback);
  return Number.isFinite(page) && page > 0 ? page : fallback;
};

const normalizeLimit = (value?: number | string, fallback = 10) => {
  const limit = Number(value ?? fallback);
  if (!Number.isFinite(limit) || limit <= 0) return fallback;
  return Math.min(limit, 100);
};

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVisitDto: CreateVisitDto) {
    const visitDate = new Date(createVisitDto.visitDate);
    const record = await this.prisma.visit.create({
      data: {
        userId: Number(createVisitDto.userId),
        shelterId: Number(createVisitDto.shelterId),
        visitDate,
        status: normalizeVisitStatus(createVisitDto.status),
      },
    });

    return record;
  }

  async findMyVisits(userId: number, query: { page?: number | string; limit?: number | string; date?: string; status?: string } = {}) {
    const page = normalizePage(query.page, 1);
    const limit = normalizeLimit(query.limit, 10);
    const skip = (page - 1) * limit;
    const where: Record<string, unknown> = { userId: Number(userId) };

    if (query.date) {
      where.visitDate = new Date(query.date);
    }

    if (query.status) {
      where.status = normalizeVisitStatus(query.status);
    }

    const [items, total] = await Promise.all([
      this.prisma.visit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { visitDate: 'desc' },
      }),
      this.prisma.visit.count({ where }),
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  async findShelterVisits(shelterId: number, query: { page?: number | string; limit?: number | string; date?: string; status?: string } = {}) {
    const page = normalizePage(query.page, 1);
    const limit = normalizeLimit(query.limit, 10);
    const skip = (page - 1) * limit;
    const where: Record<string, unknown> = { shelterId: Number(shelterId) };

    if (query.date) {
      where.visitDate = new Date(query.date);
    }

    if (query.status) {
      where.status = normalizeVisitStatus(query.status);
    }

    const [items, total] = await Promise.all([
      this.prisma.visit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { visitDate: 'desc' },
      }),
      this.prisma.visit.count({ where }),
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  async findOne(id: number) {
    const visit = await this.prisma.visit.findUnique({ where: { id: Number(id) } });

    if (!visit) {
      throw new NotFoundException(`Visita com id ${id} não encontrada.`);
    }

    return visit;
  }

  async cancel(id: number) {
    const visit = await this.findOne(id);

    return this.prisma.visit.update({
      where: { id: visit.id },
      data: { status: VisitStatus.CANCELADA },
    });
  }

  async complete(id: number) {
    const visit = await this.findOne(id);

    return this.prisma.visit.update({
      where: { id: visit.id },
      data: { status: VisitStatus.CONFIRMADA },
    });
  }

  findAll() {
    return this.prisma.visit.findMany({
      take: 100,
      orderBy: { visitDate: 'desc' },
    });
  }

  update(id: number, updateVisitDto: UpdateVisitDto) {
    return this.prisma.visit.update({
      where: { id },
      data: {
        ...(updateVisitDto.status ? { status: normalizeVisitStatus(updateVisitDto.status) as VisitStatusValue } : {}),
        ...(updateVisitDto.visitDate ? { visitDate: new Date(updateVisitDto.visitDate) } : {}),
      },
    });
  }

  remove(id: number) {
    return this.prisma.visit.delete({ where: { id } });
  }
}
