/*
  Warnings:

  - You are about to drop the column `userId` on the `NumData` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NumData" DROP CONSTRAINT "NumData_userId_fkey";

-- DropIndex
DROP INDEX "NumData_userId_idx";

-- AlterTable
ALTER TABLE "NumData" DROP COLUMN "userId";
