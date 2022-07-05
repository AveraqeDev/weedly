-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('PRE_ROLL', 'FLOWER', 'CONCENTRATE', 'MOON_ROCKS', 'OTHER');

-- CreateTable
CREATE TABLE "ProductTag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255),

    CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "type" "ProductType" NOT NULL DEFAULT 'FLOWER',
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToProductTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductTag_name_key" ON "ProductTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductTag_AB_unique" ON "_ProductToProductTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductTag_B_index" ON "_ProductToProductTag"("B");

-- AddForeignKey
ALTER TABLE "_ProductToProductTag" ADD CONSTRAINT "_ProductToProductTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductTag" ADD CONSTRAINT "_ProductToProductTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
