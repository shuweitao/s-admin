/*
  Warnings:

  - Added the required column `desc` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `desc` TEXT NOT NULL;
