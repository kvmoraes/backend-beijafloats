-- AlterTable
ALTER TABLE `recipe` MODIFY `image` VARCHAR(191) NOT NULL DEFAULT 'https://froesmhs.com/beer.jpeg';

-- CreateTable
CREATE TABLE `beer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `recipeSaleId` INTEGER NOT NULL,
    `creatorId` INTEGER NOT NULL,
    `buyerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `beer_recipeSaleId_fkey`(`recipeSaleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beer_sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `token_address` VARCHAR(191) NOT NULL,
    `beerId` INTEGER NOT NULL,
    `buyerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `beer_sale_token_address_key`(`token_address`),
    INDEX `recipe_sale_buyerId_fkey`(`buyerId`),
    INDEX `beer_sale_beerId_fkey`(`beerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `beer` ADD CONSTRAINT `beer_recipeSaleId_fkey` FOREIGN KEY (`recipeSaleId`) REFERENCES `recipe_sale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beer_sale` ADD CONSTRAINT `beer_sale_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beer_sale` ADD CONSTRAINT `beer_sale_beerId_fkey` FOREIGN KEY (`beerId`) REFERENCES `beer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
