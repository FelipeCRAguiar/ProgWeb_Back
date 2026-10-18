import { PrismaClient } from '../generated/prisma/client.js';

export async function seedAnimals(prisma: PrismaClient) {
    console.log('🌱 [Animals] Populando espécies, raças, abrigos e animais...');


    let cao = await prisma.species.findFirst({ where: { name: 'Cão' } });
    if (!cao) {
        cao = await prisma.species.create({
            data: { name: 'Cão', description: 'Família Canidae' },
        });
    }

    let gato = await prisma.species.findFirst({ where: { name: 'Gato' } });
    if (!gato) {
        gato = await prisma.species.create({
            data: { name: 'Gato', description: 'Família Felidae' },
        });
    }

    let viraLata = await prisma.race.findFirst({
        where: { name: 'Vira-lata', speciesId: cao.id },
    });
    if (!viraLata) {
        viraLata = await prisma.race.create({
            data: { name: 'Vira-lata', size: 'MEDIO', speciesId: cao.id },
        });
    }

    let siames = await prisma.race.findFirst({
        where: { name: 'Siamês', speciesId: gato.id },
    });
    if (!siames) {
        siames = await prisma.race.create({
            data: { name: 'Siamês', size: 'MEDIO', speciesId: gato.id },
        });
    }

    const abrigo = await prisma.shelter.upsert({
        where: { cnpj: '12345678000199' },
        update: {},
        create: {
            name: 'Abrigo Esperança',
            cnpj: '12345678000199',
            address: 'Rua dos Animais, 123',
            phone: '83988887777',
            email: 'abrigo@esperanca.com',
            maxCapacity: 50,
            workingHours: '08:00 - 17:00',
            atendeeLimit: 10,
        },
    });

    // 4. Animal (findFirst + create para evitar conflito se já existir)
    let rex = await prisma.animal.findFirst({
        where: { name: 'Rex', raceId: viraLata.id },
    });
    if (!rex) {
        rex = await prisma.animal.create({
            data: {
                name: 'Rex',
                sex: 'MACHO',
                birthday: new Date('2022-01-01'),
                description: 'Cachorro dócil e brincalhão',
                status: 'DISPONIVEL',
                raceId: viraLata.id,
                shelterId: abrigo.id,
            },
        });
    }

    console.log('✅ [Animals] Dados de animais e abrigos criados com sucesso!');
}
