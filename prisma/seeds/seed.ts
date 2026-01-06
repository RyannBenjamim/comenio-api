import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const {
    PRIMEIRO_NOME,
    SOBRENOME,
    EMAIL,
    SENHA,
    DATA_NASCIMENTO,
    TELEFONE,
  } = process.env;

  if (
    !PRIMEIRO_NOME ||
    !SOBRENOME ||
    !EMAIL ||
    !SENHA ||
    !DATA_NASCIMENTO ||
    !TELEFONE
  ) {
    throw new Error('Variáveis de ambiente do Superadmin não configuradas corretamente.');
  }

  const existingSuperadmin = await prisma.superadmin.findUnique({
    where: { email: EMAIL },
  });

  if (!existingSuperadmin) {
    const hashedPassword = await bcrypt.hash(SENHA, 10);

    await prisma.superadmin.create({
      data: {
        primeiroNome: PRIMEIRO_NOME,
        sobrenome: SOBRENOME,
        email: EMAIL,
        senha: hashedPassword,
        dataNascimento: new Date(DATA_NASCIMENTO),
        telefone: TELEFONE,
      },
    });

    console.log('Superadmin criado com sucesso');
  } else {
    console.log('Superadmin já existe');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
