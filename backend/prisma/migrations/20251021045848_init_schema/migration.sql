-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[],
    "additional_links" TEXT[],
    "code_link" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
