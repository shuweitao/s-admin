-- AlterTable
ALTER TABLE `article` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1;