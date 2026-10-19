import pg from 'pg';

const { Client } = pg;
const connectionString = process.env.DATABASE_URL ?? 'postgresql://postgres:bancodoroma@localhost:5433/animal?schema=public';

const client = new Client({ connectionString });

async function getOrCreateUser() {
  const existing = await client.query(
    'SELECT id FROM "User" WHERE email = $1 LIMIT 1',
    ['teste@email.com'],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `INSERT INTO "User" (username, email, password, cpf, phone, birthday, status, profile)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id`,
    [
      'usuario_teste',
      'teste@email.com',
      '123456',
      '12345678900',
      '11999999999',
      '1990-01-01',
      'ATIVO',
      'ADOTANTE',
    ],
  );

  return result.rows[0].id;
}

async function getOrCreateShelter() {
  const existing = await client.query(
    'SELECT id FROM "Shelter" WHERE email = $1 LIMIT 1',
    ['abrigo@email.com'],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const result = await client.query(
    `INSERT INTO "Shelter" (name, cnpj, address, phone, email, "maxCapacity", "workingHours", "atendeeLimit")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id`,
    [
      'Abrigo Teste',
      '12345678000199',
      'Rua Teste, 123',
      '11988888888',
      'abrigo@email.com',
      20,
      '08:00-18:00',
      10,
    ],
  );

  return result.rows[0].id;
}

async function main() {
  try {
    await client.connect();

    const userId = await getOrCreateUser();
    const shelterId = await getOrCreateShelter();

    console.log('Seed concluído com sucesso.');
    console.log({ userId, shelterId });
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error('Erro ao executar seed:', error);
  process.exit(1);
});
