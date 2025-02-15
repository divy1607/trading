/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Data` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "createdAt",
ADD COLUMN     "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "number" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Data_userId_idx" ON "Data"("userId");

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
