import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { seedAuth } from '../modules/auth/seed.js';
import { seedAnimals } from '../animals/seed.js';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL não foi encontrada nas variáveis de ambiente (.env).');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log(' Iniciando Seed do Banco de Dados.\n');

    await seedAuth(prisma);
    await seedAnimals(prisma);

    console.log('\n Seed finalizado com sucesso');
}

main()
    .catch((e) => {
        console.error('Erro ao rodar o seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
