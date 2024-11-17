/*
  Warnings:

  - You are about to drop the column `battVoltMppt` on the `BmsLoggers` table. All the data in the column will be lost.
  - You are about to drop the column `cpuTemp` on the `BmsLoggers` table. All the data in the column will be lost.
  - You are about to drop the column `energyId` on the `BmsLoggers` table. All the data in the column will be lost.
  - You are about to drop the column `load1` on the `BmsLoggers` table. All the data in the column will be lost.
  - You are about to drop the column `load2` on the `BmsLoggers` table. All the data in the column will be lost.
  - You are about to drop the column `load3` on the `BmsLoggers` table. All the data in the column will be lost.
  - You are about to drop the column `pvId` on the `BmsLoggers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BmsLoggers" DROP CONSTRAINT "BmsLoggers_energyId_fkey";

-- DropForeignKey
ALTER TABLE "BmsLoggers" DROP CONSTRAINT "BmsLoggers_pvId_fkey";

-- AlterTable
ALTER TABLE "BmsLoggers" DROP COLUMN "battVoltMppt",
DROP COLUMN "cpuTemp",
DROP COLUMN "energyId",
DROP COLUMN "load1",
DROP COLUMN "load2",
DROP COLUMN "load3",
DROP COLUMN "pvId",
ADD COLUMN     "mpptLoggersId" BIGINT;

-- CreateTable
CREATE TABLE "MpptLoggers" (
    "id" BIGSERIAL NOT NULL,
    "battVolt" INTEGER,
    "cpuTemp" DOUBLE PRECISION,
    "load1" DOUBLE PRECISION,
    "load2" DOUBLE PRECISION,
    "load3" DOUBLE PRECISION,
    "pv1Curr" DOUBLE PRECISION,
    "pv1Volt" DOUBLE PRECISION,
    "pv2Curr" DOUBLE PRECISION,
    "pv2Volt" DOUBLE PRECISION,
    "pv3Curr" DOUBLE PRECISION,
    "pv3Volt" DOUBLE PRECISION,
    "edl1" DOUBLE PRECISION,
    "edl2" DOUBLE PRECISION,
    "edl3" DOUBLE PRECISION,
    "eh1" DOUBLE PRECISION,
    "eh2" DOUBLE PRECISION,
    "eh3" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MpptLoggers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BmsLoggers" ADD CONSTRAINT "BmsLoggers_mpptLoggersId_fkey" FOREIGN KEY ("mpptLoggersId") REFERENCES "MpptLoggers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
