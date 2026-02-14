/*
  Warnings:

  - You are about to drop the `DiaryEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ATHLETE', 'PARENT', 'COACH', 'ADMIN');

-- DropForeignKey
ALTER TABLE "public"."DiaryEntry" DROP CONSTRAINT "DiaryEntry_authorId_fkey";

-- DropTable
DROP TABLE "public"."DiaryEntry";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "role" "public"."UserRole" NOT NULL DEFAULT 'ATHLETE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."diary_entries" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "focus" TEXT,
    "notes" TEXT,
    "techniquRating" INTEGER,
    "physicalRating" INTEGER,
    "mentalRating" INTEGER,
    "whatWentWell" TEXT,
    "whatWasDifficult" TEXT,
    "nextGoal" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diary_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "diary_entries_authorId_idx" ON "public"."diary_entries"("authorId");

-- CreateIndex
CREATE INDEX "diary_entries_date_idx" ON "public"."diary_entries"("date");

-- CreateIndex
CREATE UNIQUE INDEX "diary_entries_authorId_date_key" ON "public"."diary_entries"("authorId", "date");

-- AddForeignKey
ALTER TABLE "public"."diary_entries" ADD CONSTRAINT "diary_entries_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
