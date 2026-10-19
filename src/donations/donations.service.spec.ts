import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { DonationsService } from './donations.service.js';

describe('DonationsService', () => {
  let service: DonationsService;
  const prisma = {
    donation: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      aggregate: vi.fn(),
      groupBy: vi.fn(),
    },
    adoption: {
      count: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonationsService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<DonationsService>(DonationsService);
    vi.clearAllMocks();
  });

  it('should create a donation and normalize the enum values', async () => {
    prisma.donation.create.mockResolvedValue({
      id: 1,
      userId: 11,
      shelterId: 4,
      type: 'DINHEIRO',
      value: 150,
      description: 'Ajuda mensal',
      status: 'PENDENTE',
    });

    const result = await service.create({
      userId: 11,
      shelterId: 4,
      type: 'DINHEIRO',
      value: 150,
      description: 'Ajuda mensal',
      status: 'PENDENTE',
    });

    expect(prisma.donation.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: 11,
        shelterId: 4,
        type: 'DINHEIRO',
        value: 150,
        status: 'PENDENTE',
      }),
    });
    expect(result.status).toBe('PENDENTE');
  });

  it('should return consolidated donation stats', async () => {
    prisma.donation.aggregate.mockResolvedValue({ _sum: { value: 5200 } });
    prisma.donation.groupBy.mockResolvedValue([{ userId: 10 }, { userId: 11 }]);
    prisma.adoption.count.mockResolvedValue(8);

    const result = await service.getStats();

    expect(result.totalDoadoMes).toBe(5200);
    expect(result.padrinhosAtivos).toBe(2);
    expect(result.totalAnimaisAdotados).toBe(8);
  });
});
