import { PrismaService } from '../prisma/prisma.service.js';
import { RaceService } from './race.service.js';
import { Size } from '../generated/prisma/enums.js';

export async function seedRaces(prisma: PrismaService) {
  const raceService = new RaceService(prisma);

  const races = [
    {
      name: 'Vira-lata',
      size: Size.MEDIO,
      speciesId: 1,
    },
    {
      name: 'Labrador',
      size: Size.GRANDE,
      speciesId: 2,
    },
    {
      name: 'Poodle',
      size: Size.PEQUENO,
      speciesId: 3,
    },
  ];

  for (const race of races) {
    const existingRace = await prisma.race.findFirst({
      where: { name: race.name },
    });

    if (!existingRace) {
      await raceService.create(race);
      console.log(`Raça criada: ${race.name}`);
    } else {
      console.log(`Raça já existe: ${race.name}`);
    }
  }
}