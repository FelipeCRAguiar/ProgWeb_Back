import { PrismaService } from '../prisma/prisma.service.js';

const prisma = new PrismaService();

export async function seedMedicalRecords() {
  const animals = await prisma.animal.findMany({ take: 3 });

  if (animals.length === 0) {
    console.log('Nenhum animal encontrado. Rode o seed de animais antes.');
    return;
  }

  const records: any[] = [];

  for (const animal of animals) {
    records.push(
      {
        animalId: animal.id,
        type: 'VACINA',
        description: 'Vacina antirrábica',
        date: new Date('2026-02-10'),
        vaterinaryName: 'Dra. Souza',
      },
      {
        animalId: animal.id,
        type: 'CONSULTA',
        description: 'Check-up geral',
        date: new Date('2026-03-18'),
        vaterinaryName: 'Dr. Almeida',
      },
      {
        animalId: animal.id,
        type: 'EXAME',
        description: 'Exame de sangue',
        date: new Date('2026-04-02'),
        vaterinaryName: 'Dra. Souza',
      },
    );
  }

  records.push({
    animalId: animals[0].id,
    type: 'CASTRACAO',
    description: 'Castração',
    date: new Date('2026-05-12'),
    vaterinaryName: 'Dr. Almeida',
  });

  await prisma.medicalRecord.deleteMany({});
  await prisma.medicalRecord.createMany({ data: records });

  console.log(`${records.length} registros médicos inseridos com sucesso!`);
}