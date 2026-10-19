import { PrismaService } from './prisma.service.js';
import { seedShelters } from '../shelter/shelter.seeds.js';
import { seedSpecies } from '../species/species.seeds.js';
import { seedAuth } from '../modules/auth/seed.js';
import { seedAnimals } from '../animals/seed.js';
import { seedAdoptions } from '../adoption/adoption.seed.js';
import { seedRaces } from '../race/race.seeds.js';

const prisma = new PrismaService();

async function main() {
  console.log('Inserindo os seeds');

  await seedShelters();
  await seedSpecies();
  await seedAuth(prisma);
  await seedRaces(prisma);
  await seedAnimals(prisma);
  await seedAdoptions(prisma);

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