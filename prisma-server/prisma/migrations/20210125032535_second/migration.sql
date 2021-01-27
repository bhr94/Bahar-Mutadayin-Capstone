/*
  Warnings:

  - Added the required column `eventId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN     `eventId` INT NOT NULL;

-- CreateIndex
CREATE INDEX `eventId` ON `Comment`(`eventId`);

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
