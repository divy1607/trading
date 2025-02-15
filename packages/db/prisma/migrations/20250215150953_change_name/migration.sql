/*
  Warnings:

  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_userId_fkey";

-- DropTable
DROP TABLE "Data";

-- CreateTable
CREATE TABLE "NumData" (
    "id" SERIAL NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "NumData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NumData_userId_idx" ON "NumData"("userId");

-- AddForeignKey
ALTER TABLE "NumData" ADD CONSTRAINT "NumData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
