import { PrismaService } from '../prisma/prisma.service.js';
import { AdoptionService } from './adoption.service.js';
import { AdoptionStatus } from '../generated/prisma/enums.js';

export async function seedAdoptions(prisma: PrismaService) {
  const adoptionService = new AdoptionService(prisma);

  const adoptions = [
    {
      userId: 1,
      animalId: 1,
      status: AdoptionStatus.PENDENTE,
      observation: 'Solicitação de adoção do primeiro animal',
      adoptionDate: new Date('2026-10-01'),
    },
    {
      userId: 2,
      animalId: 2,
      status: AdoptionStatus.EM_ANALISE,
      observation: 'Solicitação de adoção do segundo animal',
      adoptionDate: new Date('2026-10-02'),
    },
    {
      userId: 3,
      animalId: 3,
      status: AdoptionStatus.PENDENTE,
      observation: 'Solicitação de adoção do terceiro animal',
      adoptionDate: new Date('2026-10-03'),
    },
  ];

  for (const adoption of adoptions) {
    const existingAdoption = await prisma.adoption.findFirst({
      where: {
        userId: adoption.userId,
        animalId: adoption.animalId,
      },
    });

    if (existingAdoption) {
      console.log(
        `Adoção já existe para userId ${adoption.userId} e animalId ${adoption.animalId}`,
      );
      continue;
    }

    const adoptionInProgress = await prisma.adoption.findFirst({
      where: {
        userId: adoption.userId,
        status: {
          in: [
            AdoptionStatus.PENDENTE,
            AdoptionStatus.EM_ANALISE,
          ],
        },
      },
    });

    if (adoptionInProgress) {
      console.log(
        `Usuário ${adoption.userId} já possui uma adoção em andamento`,
      );
      continue;
    }

    await adoptionService.create(adoption);

    console.log(
      `Adoção criada: usuário ${adoption.userId}, animal ${adoption.animalId}`,
    );
  }
}