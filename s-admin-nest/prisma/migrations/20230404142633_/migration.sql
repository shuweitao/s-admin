-- DropIndex
DROP INDEX `Permission_name_key` ON `permission`;

-- DropIndex
DROP INDEX `Permission_path_key` ON `permission`;

-- AlterTable
ALTER TABLE `permission` MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'M';
