-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Term_name_key" ON "Term"("name");

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
