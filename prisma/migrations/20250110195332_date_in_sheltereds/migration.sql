/*
  Warnings:

  - The `entryDate` column on the `Sheltered` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `exitDate` column on the `Sheltered` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Sheltered" DROP COLUMN "entryDate",
ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "exitDate",
ADD COLUMN     "exitDate" TIMESTAMP(3);
