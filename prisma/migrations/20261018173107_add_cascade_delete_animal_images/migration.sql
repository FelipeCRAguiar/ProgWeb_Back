-- DropForeignKey
ALTER TABLE "AnimalImage" DROP CONSTRAINT "AnimalImage_animalId_fkey";

-- AddForeignKey
ALTER TABLE "AnimalImage" ADD CONSTRAINT "AnimalImage_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
