import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DonationStatus, DonationType } from '../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDonationDto } from './dto/create-donation.dto.js';
import { UpdateDonationDto } from './dto/update-donation.dto.js';

type DonationTypeValue = (typeof DonationType)[keyof typeof DonationType];
type DonationStatusValue = (typeof DonationStatus)[keyof typeof DonationStatus];

const normalizeDonationType = (type?: string): DonationTypeValue => {
  const normalized = type?.trim().toUpperCase();

  if (!normalized) return DonationType.OUTRO;

  if (['DINHEIRO', 'RACAO', 'MEDICAMENTO', 'OUTRO'].includes(normalized)) {
    return normalized as DonationTypeValue;
  }

  throw new BadRequestException(`Tipo de doação inválido: ${type}`);
};

const normalizeDonationStatus = (status?: string): DonationStatusValue => {
  const normalized = status?.trim().toUpperCase();

  if (!normalized) return DonationStatus.PENDENTE;

  if (['PENDENTE'].includes(normalized)) return DonationStatus.PENDENTE;
  if (['CONFIRMADO', 'CONFIRMADA', 'APROVADO', 'APROVADA'].includes(normalized)) return DonationStatus.CONFIRMADO;
  if (['CANCELADO', 'CANCELADA'].includes(normalized)) return DonationStatus.CANCELADO;

  throw new BadRequestException(`Status de doação inválido: ${status}`);
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
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDonationDto: CreateDonationDto) {
    const record = await this.prisma.donation.create({
      data: {
        userId: Number(createDonationDto.userId),
        shelterId: Number(createDonationDto.shelterId),
        type: normalizeDonationType(createDonationDto.type) as DonationTypeValue,
        value: createDonationDto.value ? Number(createDonationDto.value) : null,
        description: createDonationDto.description ?? null,
        status: normalizeDonationStatus(createDonationDto.status) as DonationStatusValue,
      },
    });

    return record;
  }

  async findMyDonations(userId: number, query: { page?: number | string; limit?: number | string; type?: string; status?: string } = {}) {
    const page = normalizePage(query.page, 1);
    const limit = normalizeLimit(query.limit, 10);
    const skip = (page - 1) * limit;
    const where: Record<string, unknown> = { userId: Number(userId) };

    if (query.type) {
      where.type = normalizeDonationType(query.type);
    }

    if (query.status) {
      where.status = normalizeDonationStatus(query.status);
    }

    const [items, total] = await Promise.all([
      this.prisma.donation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.donation.count({ where }),
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  async findShelterDonations(shelterId: number, query: { page?: number | string; limit?: number | string; type?: string; status?: string } = {}) {
    const page = normalizePage(query.page, 1);
    const limit = normalizeLimit(query.limit, 10);
    const skip = (page - 1) * limit;
    const where: Record<string, unknown> = { shelterId: Number(shelterId) };

    if (query.type) {
      where.type = normalizeDonationType(query.type);
    }

    if (query.status) {
      where.status = normalizeDonationStatus(query.status);
    }

    const [items, total] = await Promise.all([
      this.prisma.donation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.donation.count({ where }),
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
    const donation = await this.prisma.donation.findUnique({ where: { id: Number(id) } });

    if (!donation) {
      throw new NotFoundException(`Doação com id ${id} não encontrada.`);
    }

    return donation;
  }

  async update(id: number, updateDonationDto: UpdateDonationDto) {
    const existing = await this.findOne(id);

    return this.prisma.donation.update({
      where: { id: existing.id },
      data: {
        ...(updateDonationDto.type ? { type: normalizeDonationType(updateDonationDto.type) as DonationTypeValue } : {}),
        ...(updateDonationDto.value !== undefined ? { value: Number(updateDonationDto.value) } : {}),
        ...(updateDonationDto.description !== undefined ? { description: updateDonationDto.description } : {}),
        ...(updateDonationDto.status ? { status: normalizeDonationStatus(updateDonationDto.status) as DonationStatusValue } : {}),
      },
    });
  }

  async getStats() {
    const [totalDoadoMes, padrinhosAtivos, totalAnimaisAdotados] = await Promise.all([
      this.prisma.donation.aggregate({
        _sum: { value: true },
      }),
      this.prisma.donation.groupBy({
        by: ['userId'],
      }),
      this.prisma.adoption.count({ where: { status: 'APROVADO' } }),
    ]);

    return {
      totalDoadoMes: totalDoadoMes._sum.value ?? 0,
      padrinhosAtivos: padrinhosAtivos.length,
      totalAnimaisAdotados,
    };
  }

  findAll() {
    return this.prisma.donation.findMany({
      take: 100,
      orderBy: { id: 'desc' },
    });
  }

  remove(id: number) {
    return this.prisma.donation.delete({ where: { id } });
  }
}
