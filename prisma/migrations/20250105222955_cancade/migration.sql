-- DropForeignKey
ALTER TABLE "Need" DROP CONSTRAINT "Need_shelterId_fkey";

-- DropForeignKey
ALTER TABLE "Sheltered" DROP CONSTRAINT "Sheltered_shelterId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_shelterId_fkey";

-- AddForeignKey
ALTER TABLE "Sheltered" ADD CONSTRAINT "Sheltered_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Need" ADD CONSTRAINT "Need_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
