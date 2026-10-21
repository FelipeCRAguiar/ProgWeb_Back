-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('PENDENTE', 'CONFIRMADO', 'CANCELADO');

-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "status" "DonationStatus" NOT NULL DEFAULT 'PENDENTE';
