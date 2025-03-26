-- CreateEnum
CREATE TYPE "ActionStatusType" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "EventStatusType" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "ProjectStatusType" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "PublicationStatusType" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "ResearchAreaStatusType" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "ResearcherStatusType" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "TeamMemberStatusType" AS ENUM ('published', 'draft');

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT NOT NULL DEFAULT '',
    "resume" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "image_id" TEXT,
    "image_filesize" INTEGER,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_extension" TEXT,
    "date" DATE NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "status" "ActionStatusType" NOT NULL DEFAULT 'draft',

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "facebookUrl" TEXT NOT NULL DEFAULT '',
    "instagramUrl" TEXT NOT NULL DEFAULT '',
    "youtubeUrl" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT NOT NULL DEFAULT '',
    "resume" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "image_id" TEXT,
    "image_filesize" INTEGER,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_extension" TEXT,
    "link" TEXT NOT NULL DEFAULT '',
    "workload" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "locale" TEXT NOT NULL DEFAULT '',
    "publishedAt" TIMESTAMP(3),
    "status" "EventStatusType" NOT NULL DEFAULT 'draft',

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL,
    "titleOne" TEXT NOT NULL DEFAULT '',
    "contentOne" TEXT NOT NULL DEFAULT '',
    "titleTwo" TEXT NOT NULL DEFAULT '',
    "contentTwo" TEXT NOT NULL DEFAULT '',
    "titleThree" TEXT NOT NULL DEFAULT '',
    "contentThree" TEXT NOT NULL DEFAULT '',
    "titleFour" TEXT NOT NULL DEFAULT '',
    "contentFour" TEXT NOT NULL DEFAULT '',
    "titleFive" TEXT NOT NULL DEFAULT '',
    "contentFive" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeSection" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "image_id" TEXT,
    "image_filesize" INTEGER,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_extension" TEXT,

    CONSTRAINT "HomeSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterList" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "NewsletterList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "image_id" TEXT,
    "image_filesize" INTEGER,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_extension" TEXT,
    "link" TEXT NOT NULL DEFAULT '',
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "researchArea" TEXT,
    "publishedAt" TIMESTAMP(3),
    "status" "ProjectStatusType" NOT NULL DEFAULT 'draft',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT NOT NULL DEFAULT '',
    "resume" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "link" TEXT NOT NULL DEFAULT '',
    "date" DATE NOT NULL,
    "researchArea" TEXT,
    "magazine" TEXT NOT NULL DEFAULT '',
    "doi" TEXT NOT NULL DEFAULT '',
    "license" TEXT NOT NULL DEFAULT '',
    "publishedAt" TIMESTAMP(3),
    "status" "PublicationStatusType" NOT NULL DEFAULT 'draft',

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchArea" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "resume" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "image_id" TEXT,
    "image_filesize" INTEGER,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_extension" TEXT,
    "icon_id" TEXT,
    "icon_filesize" INTEGER,
    "icon_width" INTEGER,
    "icon_height" INTEGER,
    "icon_extension" TEXT,
    "publishedAt" TIMESTAMP(3),
    "status" "ResearchAreaStatusType" NOT NULL DEFAULT 'draft',

    CONSTRAINT "ResearchArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Researcher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "publishedAt" TIMESTAMP(3),
    "status" "ResearcherStatusType" NOT NULL DEFAULT 'draft',

    CONSTRAINT "Researcher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT '',
    "image_id" TEXT,
    "image_filesize" INTEGER,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_extension" TEXT,
    "link" TEXT NOT NULL DEFAULT '',
    "publishedAt" TIMESTAMP(3),
    "status" "TeamMemberStatusType" NOT NULL DEFAULT 'draft',

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchSection" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ResearchSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamSection" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "TeamSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorySection" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "HistorySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicationsSection" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PublicationsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventsSection" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "EventsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionsSection" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ActionsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsSection" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ProjectsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Project_researchers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Publication_researchers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Action_slug_key" ON "Action"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterList_email_key" ON "NewsletterList"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_researchArea_idx" ON "Project"("researchArea");

-- CreateIndex
CREATE UNIQUE INDEX "Publication_slug_key" ON "Publication"("slug");

-- CreateIndex
CREATE INDEX "Publication_researchArea_idx" ON "Publication"("researchArea");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_researchers_AB_unique" ON "_Project_researchers"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_researchers_B_index" ON "_Project_researchers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Publication_researchers_AB_unique" ON "_Publication_researchers"("A", "B");

-- CreateIndex
CREATE INDEX "_Publication_researchers_B_index" ON "_Publication_researchers"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_researchArea_fkey" FOREIGN KEY ("researchArea") REFERENCES "ResearchArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_researchArea_fkey" FOREIGN KEY ("researchArea") REFERENCES "ResearchArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_researchers" ADD CONSTRAINT "_Project_researchers_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Project_researchers" ADD CONSTRAINT "_Project_researchers_B_fkey" FOREIGN KEY ("B") REFERENCES "Researcher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Publication_researchers" ADD CONSTRAINT "_Publication_researchers_A_fkey" FOREIGN KEY ("A") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Publication_researchers" ADD CONSTRAINT "_Publication_researchers_B_fkey" FOREIGN KEY ("B") REFERENCES "Researcher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
