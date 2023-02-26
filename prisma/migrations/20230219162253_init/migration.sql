/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistToFavorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorite" DROP CONSTRAINT "_ArtistToFavorite_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorite" DROP CONSTRAINT "_ArtistToFavorite_B_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoriteId";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favoriteId";

-- DropTable
DROP TABLE "Favorite";

-- DropTable
DROP TABLE "_ArtistToFavorite";
