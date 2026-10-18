import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js'; 
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config(); 

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
<<<<<<< HEAD
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL não foi encontrada nas variáveis de ambiente. Verifique o seu arquivo .env.',
      );
    }

    const adapter = new PrismaPg({
      connectionString,
=======
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
>>>>>>> origin/main
    });

    const adapter = new PrismaPg(pool); 

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}