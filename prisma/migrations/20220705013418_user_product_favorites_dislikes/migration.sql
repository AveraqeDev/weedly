-- CreateTable
CREATE TABLE "UserProductFavorite" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProductFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProductDislike" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProductDislike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProductFavorite" ADD CONSTRAINT "UserProductFavorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProductDislike" ADD CONSTRAINT "UserProductDislike_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
