/*
  Warnings:

  - You are about to drop the `RevokedToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Shelter" ADD COLUMN     "visitingHours" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "RevokedToken";
