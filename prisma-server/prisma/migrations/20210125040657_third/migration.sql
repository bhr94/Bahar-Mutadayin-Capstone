/*
  Warnings:

  - The migration will change the primary key for the `Invitation` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Invitation` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- AlterTable
ALTER TABLE `Invitation` DROP PRIMARY KEY,
    MODIFY `id` INT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
