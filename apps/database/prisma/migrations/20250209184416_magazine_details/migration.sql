/*
  Warnings:

  - Added the required column `doi` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magazine` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "doi" VARCHAR(200) NOT NULL,
ADD COLUMN     "license" VARCHAR(200) NOT NULL,
ADD COLUMN     "magazine" VARCHAR(200) NOT NULL;
