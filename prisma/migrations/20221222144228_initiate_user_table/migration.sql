-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `upline` VARCHAR(191) NOT NULL,
    `blockNumber` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_address_key`(`address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;