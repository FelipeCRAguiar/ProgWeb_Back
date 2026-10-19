import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { VisitsService } from './visits.service.js';

describe('VisitsService', () => {
  let service: VisitsService;
  const prisma = {
    visit: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitsService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<VisitsService>(VisitsService);
    vi.clearAllMocks();
  });

  it('should create a visit and normalize the status', async () => {
    prisma.visit.create.mockResolvedValue({
      id: 1,
      userId: 10,
      shelterId: 3,
      visitDate: new Date('2026-10-25'),
      status: 'AGENDADA',
    });

    const result = await service.create({
      userId: 10,
      shelterId: 3,
      visitDate: '2026-10-25',
      status: 'AGENDADO',
    });

    expect(prisma.visit.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: 10,
        shelterId: 3,
        status: 'AGENDADA',
        visitDate: new Date('2026-10-25'),
      }),
    });
    expect(result.status).toBe('AGENDADA');
  });

  it('should list visits for a shelter with filters and pagination', async () => {
    prisma.visit.findMany.mockResolvedValue([
      { id: 5, userId: 10, shelterId: 3, visitDate: new Date('2026-10-25'), status: 'CONFIRMADA' },
    ]);
    prisma.visit.count.mockResolvedValue(1);

    const result = await service.findShelterVisits(3, {
      page: 2,
      limit: 10,
      status: 'CONCLUIDO',
      date: '2026-10-25',
    });

    expect(prisma.visit.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          shelterId: 3,
          status: 'CONFIRMADA',
          visitDate: new Date('2026-10-25'),
        }),
        skip: 10,
        take: 10,
      }),
    );
    expect(result.items).toHaveLength(1);
    expect(result.page).toBe(2);
    expect(result.total).toBe(1);
  });
});
