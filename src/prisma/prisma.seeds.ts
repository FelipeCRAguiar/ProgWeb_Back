import { PrismaService } from './prisma.service.js';
import { seedShelters } from '../shelter/shelter.seeds.js';

const prisma = new PrismaService();

async function main() {
  console.log('Inserindo os seeds');
  
  await seedShelters();

  console.log('seeds foram executados com sucesso');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });