/*
  Warnings:

  - You are about to alter the column `price` on the `recipe` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - A unique constraint covering the columns `[wallet_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallet_address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `wallet_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `wallet_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `recipe` MODIFY `price` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `recipe_sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `nft_address` VARCHAR(191) NOT NULL,
    `recipeId` INTEGER NOT NULL,
    `buyerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `recipe_sale_nft_address_key`(`nft_address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_wallet_id_key` ON `User`(`wallet_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_wallet_address_key` ON `User`(`wallet_address`);

-- AddForeignKey
ALTER TABLE `recipe_sale` ADD CONSTRAINT `recipe_sale_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recipe_sale` ADD CONSTRAINT `recipe_sale_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
