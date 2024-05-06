-- AlterTable
ALTER TABLE `User` ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT 'https://torontobrewing.ca/cdn/shop/files/hefe_300x300.png',
    ADD COLUMN `royaltiesId` VARCHAR(191) NOT NULL DEFAULT '';
