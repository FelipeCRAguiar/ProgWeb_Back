import { PrismaService } from './prisma.service.js';
import { seedShelters } from '../shelter/shelter.seeds.js';
import { seedSpecies } from '../species/species.seeds.js';

const prisma = new PrismaService();

async function main() {
  console.log('Inserindo os seeds');
  
  await seedShelters();
  await seedSpecies();

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