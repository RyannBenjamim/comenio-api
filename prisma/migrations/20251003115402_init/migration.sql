-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('SUPERADMIN', 'MODERADOR', 'PROFESSOR', 'ALUNO', 'RESPONSAVEL');

-- CreateEnum
CREATE TYPE "MateriaTipo" AS ENUM ('EXATAS', 'HUMANAS', 'NATUREZA', 'LINGUAGENS');

-- CreateTable
CREATE TABLE "Instituicao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instituicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "instituicaoId" TEXT NOT NULL,
    "primeiroNome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "fotoPerfilCaminho" TEXT,
    "cargo" "Cargo" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Superadmin" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Superadmin_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Moderador" (
    "userId" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Moderador_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Professor" (
    "userId" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "statusContrato" TEXT NOT NULL,
    "cargaHoraria" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Responsavel" (
    "userId" TEXT NOT NULL,
    "grauParentesco" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Responsavel_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "userId" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "statusMatricula" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "AlunosResponsavel" (
    "alunoId" TEXT NOT NULL,
    "responsavelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlunosResponsavel_pkey" PRIMARY KEY ("alunoId","responsavelId")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" "MateriaTipo" NOT NULL,
    "professorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlunosMateria" (
    "alunoId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlunosMateria_pkey" PRIMARY KEY ("alunoId","materiaId")
);

-- CreateTable
CREATE TABLE "ProfessoresTurma" (
    "professorId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessoresTurma_pkey" PRIMARY KEY ("professorId","turmaId")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipoPerfil" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comunidade" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "fotoCaminho" TEXT,
    "materiaId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comunidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atividade" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "pdfCaminho" TEXT,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "comunidadeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resolucao" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "atividadeId" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "pdfCaminho" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resolucao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Correcao" (
    "id" TEXT NOT NULL,
    "resolucaoId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "pdfCaminho" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Correcao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "fotoCaminho" TEXT,
    "userId" TEXT NOT NULL,
    "feedId" TEXT,
    "comunidadeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resposta" (
    "id" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "respostaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curtida" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT,
    "respostaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Curtida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Comunidade_materiaId_key" ON "Comunidade"("materiaId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Superadmin" ADD CONSTRAINT "Superadmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moderador" ADD CONSTRAINT "Moderador_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsavel" ADD CONSTRAINT "Responsavel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosResponsavel" ADD CONSTRAINT "AlunosResponsavel_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosResponsavel" ADD CONSTRAINT "AlunosResponsavel_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Responsavel"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosMateria" ADD CONSTRAINT "AlunosMateria_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosMateria" ADD CONSTRAINT "AlunosMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessoresTurma" ADD CONSTRAINT "ProfessoresTurma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessoresTurma" ADD CONSTRAINT "ProfessoresTurma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comunidade" ADD CONSTRAINT "Comunidade_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comunidade" ADD CONSTRAINT "Comunidade_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comunidade" ADD CONSTRAINT "Comunidade_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "Comunidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resolucao" ADD CONSTRAINT "Resolucao_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resolucao" ADD CONSTRAINT "Resolucao_atividadeId_fkey" FOREIGN KEY ("atividadeId") REFERENCES "Atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correcao" ADD CONSTRAINT "Correcao_resolucaoId_fkey" FOREIGN KEY ("resolucaoId") REFERENCES "Resolucao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correcao" ADD CONSTRAINT "Correcao_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "Comunidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_respostaId_fkey" FOREIGN KEY ("respostaId") REFERENCES "Resposta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_respostaId_fkey" FOREIGN KEY ("respostaId") REFERENCES "Resposta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
