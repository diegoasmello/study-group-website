/*
  Warnings:

  - You are about to drop the column `page` on the `SectionsContent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[section]` on the table `SectionsContent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `section` to the `SectionsContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionsContent" DROP COLUMN "page",
ADD COLUMN     "section" "Sections" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SectionsContent_section_key" ON "SectionsContent"("section");
