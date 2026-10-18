import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class AuthRepository {
    constructor(private prisma: PrismaService) { }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async create(data: any) {
        return this.prisma.user.create({ data });
    }

    async updatePassword(id: number, password: string) {
        return this.prisma.user.update({ where: { id }, data: { password } });
    }

    async saveRevokedToken(token: string, expiresAt: Date): Promise<void> {
        try {
            await this.prisma.revokedToken.create({
                data: {
                    token,
                    expiresAt,
                },
            });
        } catch (error) {

        }
    }
}