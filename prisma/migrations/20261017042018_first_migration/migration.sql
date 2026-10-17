-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "UserProfile" AS ENUM ('ADOTANTE', 'VOLUNTARIO', 'ADMIN');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MACHO', 'FEMEA');

-- CreateEnum
CREATE TYPE "AnimalStatus" AS ENUM ('DISPONIVEL', 'EM_PROCESSO', 'ADOTADO', 'INATIVO');

-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('VACINA', 'CONSULTA', 'CASTRACAO', 'EXAME');

-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('PENDENTE', 'EM_ANALISE', 'APROVADO', 'REJEITADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('AGENDADA', 'CONFIRMADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "DonationType" AS ENUM ('RACAO', 'DINHEIRO', 'MEDICAMENTO', 'OUTRO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT,
    "birthday" DATE NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ATIVO',
    "profile" "UserProfile" NOT NULL DEFAULT 'ADOTANTE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shelter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "workingHours" TEXT NOT NULL,
    "atendeeLimit" INTEGER NOT NULL,

    CONSTRAINT "Shelter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "speciesId" INTEGER NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "birthday" DATE NOT NULL,
    "description" TEXT,
    "status" "AnimalStatus" NOT NULL DEFAULT 'DISPONIVEL',
    "raceId" INTEGER NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "type" "RecordType" NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "vaterinaryName" TEXT NOT NULL,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adoption" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    "status" "AdoptionStatus" NOT NULL DEFAULT 'PENDENTE',
    "observation" TEXT,
    "adoptionDate" DATE NOT NULL,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shelterId" INTEGER NOT NULL,
    "visitDate" DATE NOT NULL,
    "status" "VisitStatus" NOT NULL DEFAULT 'AGENDADA',

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shelterId" INTEGER NOT NULL,
    "type" "DonationType" NOT NULL,
    "value" INTEGER,
    "description" TEXT,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalImage" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "AnimalImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_cnpj_key" ON "Shelter"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_address_key" ON "Shelter"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_phone_key" ON "Shelter"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_email_key" ON "Shelter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adoption_animalId_key" ON "Adoption"("animalId");

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalImage" ADD CONSTRAINT "AnimalImage_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
