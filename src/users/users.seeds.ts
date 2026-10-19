import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaService();

export async function seedUsers() {
  const password = await bcrypt.hash('Senha@123', 10);

  const users = [
    {
      username: 'admin',
      email: 'admin@abrigo.com',
      cpf: '11111111111',
      phone: '(21) 98888-0001',
      birthday: new Date('1990-03-15'),
      profile: 'ADMIN' as const,
      status: 'ATIVO' as const,
    },
    {
      username: 'voluntaria',
      email: 'voluntaria@abrigo.com',
      cpf: '22222222222',
      phone: '(21) 98888-0002',
      birthday: new Date('1995-07-22'),
      profile: 'VOLUNTARIO' as const,
      status: 'ATIVO' as const,
    },
    {
      username: 'adotante',
      email: 'adotante@abrigo.com',
      cpf: '33333333333',
      phone: '(21) 98888-0003',
      birthday: new Date('2000-11-05'),
      profile: 'ADOTANTE' as const,
      status: 'ATIVO' as const,
    },
    {
      username: 'adotante_inativo',
      email: 'inativo@abrigo.com',
      cpf: '44444444444',
      phone: null,
      birthday: new Date('1998-01-30'),
      profile: 'ADOTANTE' as const,
      status: 'INATIVO' as const,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password },
    });
  }

  console.log('Usuários de teste inseridos (senha: Senha@123)');
}