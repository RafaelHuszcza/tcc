/*
  Warnings:

  - The `expirationDate` column on the `Stock` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "expirationDate",
ADD COLUMN     "expirationDate" TIMESTAMP(3);
