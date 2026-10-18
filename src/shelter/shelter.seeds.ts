import { PrismaService } from '../prisma/prisma.service.js';

const prisma = new PrismaService();

export async function seedShelters() {
  const shelters = [
    {
      name: 'Abrigo Esperança Animal',
      cnpj: '12.345.678/0001-90',
      address: 'Rua das Flores, 123, Rio de Janeiro - RJ',
      phone: '(21) 98765-4321',
      email: 'contato@esperancaanimal.com',
      maxCapacity: 50,
      atendeeLimit: 10,
      workingHours: 'Segunda a Sexta, das 09:00 às 18:00',
      visitingHours: 'Sábados, das 10:00 às 16:00',
    },
    {
      name: 'Lar dos Patudos',
      cnpj: '23.456.789/0001-01',
      address: 'Avenida Central, 456, Rio de Janeiro - RJ',
      phone: '(21) 91234-5678',
      email: 'contato@lardospatudos.com',
      maxCapacity: 30,
      atendeeLimit: 5,
      workingHours: 'Segunda a Sábado, das 08:00 às 17:00',
      visitingHours: 'Domingos, das 13:00 às 17:00',
    },
    {
      name: 'Refúgio Amigo Fiel',
      cnpj: '34.567.890/0001-12',
      address: 'Estrada do Galeão, 789, Rio de Janeiro - RJ',
      phone: '(21) 99888-7766',
      email: 'ajuda@amigofiel.com',
      maxCapacity: 80,
      atendeeLimit: 15,
      workingHours: 'Segunda a Sexta, das 08:00 às 19:00',
      visitingHours: 'Sábados e Domingos, das 09:00 às 15:00',
    },
    {
      name: 'Cantinho dos animais carentes',
      cnpj: '45.678.901/0001-23',
      address: 'Rua da Carioca, 321, Rio de Janeiro - RJ',
      phone: '(21) 97777-5544',
      email: 'contato@cantinhocarente.com',
      maxCapacity: 25,
      atendeeLimit: 4,
      workingHours: 'Terça a Sábado, das 10:00 às 17:00',
      visitingHours: 'Quintas e Sábados, das 14:00 às 17:00',
    },
    {
      name: 'Associação Patas Livres',
      cnpj: '56.789.012/0001-34',
      address: 'Praça da Bandeira, 654, Rio de Janeiro - RJ',
      phone: '(21) 96666-3322',
      email: 'ong@pataslivres.com',
      maxCapacity: 60,
      atendeeLimit: 12,
      workingHours: 'Segunda a Sexta, das 09:00 às 18:00',
      visitingHours: 'Sábados, das 10:00 às 14:00',
    },
  ];

  
  await prisma.shelter.deleteMany({});

  await prisma.shelter.createMany({
    data: shelters,
  });

  console.log('5 abrigos foram inseridos com sucesso!');
}