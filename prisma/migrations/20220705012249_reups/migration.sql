-- CreateTable
CREATE TABLE "ReUp" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "from" VARCHAR(255),
    "date" TIMESTAMP(3) NOT NULL,
    "thoughts" TEXT NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReUpProduct" (
    "productId" INTEGER NOT NULL,
    "reUpId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReUpProduct_pkey" PRIMARY KEY ("productId","reUpId")
);

-- AddForeignKey
ALTER TABLE "ReUpProduct" ADD CONSTRAINT "ReUpProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReUpProduct" ADD CONSTRAINT "ReUpProduct_reUpId_fkey" FOREIGN KEY ("reUpId") REFERENCES "ReUp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
