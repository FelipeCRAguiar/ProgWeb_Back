import { PrismaClient } from '../../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

export async function seedAuth(prisma: PrismaClient) {
    console.log('[Auth] Populando usuários');

    const hashedPassword = await bcrypt.hash('123456', 10);

    await prisma.user.upsert({
        where: { email: 'admin@teste.com' },
        update: {},
        create: {
            username: 'Admin Teste',
            email: 'admin@teste.com',
            password: hashedPassword,
            cpf: '11111111111',
            phone: '83999999999',
            birthday: new Date('1990-01-01'),
            status: 'ATIVO',
            profile: 'ADMIN',
        },
    });

    console.log('[Auth] Usuário ADMIN criado (admin@teste.com / 123456)');
}