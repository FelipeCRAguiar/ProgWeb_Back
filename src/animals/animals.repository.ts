import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AnimalsRepository {
    constructor(private prisma: PrismaService) { }

    async findAll(page: number, limit: number, filters: any) {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.animal.findMany({
                where: filters,
                skip,
                take: limit,
                include: { race: { include: { species: true } } },
            }),
            this.prisma.animal.count({ where: filters }),
        ]);

        return { data, total };
    }

    async findById(id: number) {
        return this.prisma.animal.findUnique({
            where: { id },
            include: { race: { include: { species: true } }, animalImage: true },
        });
    }

    async create(data: any) {
        return this.prisma.animal.create({ data });
    }

    async update(id: number, data: any) {
        return this.prisma.animal.update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prisma.animal.delete({ where: { id } });
    }

    async addImage(animalId: number, imageUrl: string) {
        return this.prisma.animalImage.create({ data: { animalId, imageUrl } });
    }
}