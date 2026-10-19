import { PrismaClient } from '../src/generated/prisma/client.ts';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'teste@email.com' },
    update: {},
    create: {
      username: 'usuario_teste',
      email: 'teste@email.com',
      password: '123456',
      cpf: '12345678900',
      phone: '11999999999',
      birthday: new Date('1990-01-01'),
      status: 'ATIVO',
      profile: 'ADOTANTE',
    },
  });

  const shelter = await prisma.shelter.upsert({
    where: { email: 'abrigo@email.com' },
    update: {},
    create: {
      name: 'Abrigo Teste',
      cnpj: '12345678000199',
      address: 'Rua Teste, 123',
      phone: '11988888888',
      email: 'abrigo@email.com',
      maxCapacity: 20,
      workingHours: '08:00-18:00',
      atendeeLimit: 10,
    },
  });

  console.log('Seed concluído com sucesso.');
  console.log({ userId: user.id, shelterId: shelter.id });
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
