import { PrismaService } from '../prisma/prisma.service.js';

const prisma = new PrismaService();

export async function seedSpecies() {
  const species = [
    {
      name: 'Cachorro',
      description: 'Caninos domésticos de diversos portes e raças.',
    },
    {
      name: 'Gato',
      description: 'Felinos domésticos independentes e ágeis.',
    },
    {
      name: 'Coelho',
      description: 'Mamíferos lagomorfos dóceis e de pequeno porte.',
    },
    {
      name: 'Pássaro',
      description: 'Aves resgatadas de pequeno e médio porte.',
    },
    {
      name: 'Hamster',
      description: 'Pequenos roedores de hábitos noturnos.',
    },
  ];

  await prisma.species.deleteMany({});

  
  await prisma.species.createMany({
    data: species,
  });

  console.log('5 espécies foram inseridas com sucesso!');
}