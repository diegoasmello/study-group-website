-- CreateEnum
CREATE TYPE "Sections" AS ENUM ('HOME_HERO', 'RESEARCH_HERO', 'TEAM_HERO', 'PUBLICATIONS_HERO', 'EVENTS_HERO', 'ACTIONS_HERO', 'PROJECTS_HERO', 'HISTORY_HERO', 'HISTORY_SECTION');

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "keywords" VARCHAR(200) NOT NULL,
    "resume" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "keywords" VARCHAR(200) NOT NULL,
    "content" TEXT NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "researchAreaId" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "keywords" VARCHAR(200) NOT NULL,
    "resume" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "workload" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "locale" VARCHAR(200) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "keywords" VARCHAR(200) NOT NULL,
    "resume" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "researchAreaId" INTEGER NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "magazine" VARCHAR(200) NOT NULL,
    "doi" VARCHAR(200) NOT NULL,
    "license" VARCHAR(200) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchArea" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "icon" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Researcher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Researcher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "role" VARCHAR(200) NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterList" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "facebookUrl" VARCHAR(200) NOT NULL,
    "instagramUrl" VARCHAR(200) NOT NULL,
    "youtubeUrl" VARCHAR(200) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionsContent" (
    "id" SERIAL NOT NULL,
    "section" "Sections" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionsContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToResearcher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProjectToResearcher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PublicationToResearcher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PublicationToResearcher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Action_slug_key" ON "Action"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Publication_slug_key" ON "Publication"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterList_email_key" ON "NewsletterList"("email");

-- CreateIndex
CREATE INDEX "_ProjectToResearcher_B_index" ON "_ProjectToResearcher"("B");

-- CreateIndex
CREATE INDEX "_PublicationToResearcher_B_index" ON "_PublicationToResearcher"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_researchAreaId_fkey" FOREIGN KEY ("researchAreaId") REFERENCES "ResearchArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_researchAreaId_fkey" FOREIGN KEY ("researchAreaId") REFERENCES "ResearchArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToResearcher" ADD CONSTRAINT "_ProjectToResearcher_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToResearcher" ADD CONSTRAINT "_ProjectToResearcher_B_fkey" FOREIGN KEY ("B") REFERENCES "Researcher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PublicationToResearcher" ADD CONSTRAINT "_PublicationToResearcher_A_fkey" FOREIGN KEY ("A") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PublicationToResearcher" ADD CONSTRAINT "_PublicationToResearcher_B_fkey" FOREIGN KEY ("B") REFERENCES "Researcher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
