-- CreateTable
CREATE TABLE "ProductReview" (
    "id" SERIAL NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReUpUpdate" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "reUpId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReUpUpdate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReUpUpdate" ADD CONSTRAINT "ReUpUpdate_reUpId_fkey" FOREIGN KEY ("reUpId") REFERENCES "ReUp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
