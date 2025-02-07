/*
  Warnings:

  - Added the required column `resume` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "resume" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "NewsletterList" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterList_email_key" ON "NewsletterList"("email");
