/*
  Warnings:

  - Added the required column `affaireId` to the `Pointage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Affaire_entiteId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Affaire_etatAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Affaire_secteurAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Affaire_typeAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Pointage_entiteId_fkey` ON `pointage`;

-- DropIndex
DROP INDEX `Pointage_motifAbsenceId_fkey` ON `pointage`;

-- DropIndex
DROP INDEX `Pointage_semaineId_fkey` ON `pointage`;

-- DropIndex
DROP INDEX `Pointage_userId_fkey` ON `pointage`;

-- DropIndex
DROP INDEX `Semaine_etatSemaineId_fkey` ON `semaine`;

-- DropIndex
DROP INDEX `Semaine_userId_fkey` ON `semaine`;

-- DropIndex
DROP INDEX `User_entiteId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `pointage` ADD COLUMN `affaireId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_secteurAffaireId_fkey` FOREIGN KEY (`secteurAffaireId`) REFERENCES `SecteurAffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_typeAffaireId_fkey` FOREIGN KEY (`typeAffaireId`) REFERENCES `TypeAffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_etatAffaireId_fkey` FOREIGN KEY (`etatAffaireId`) REFERENCES `EtatAffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `Entite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `Entite`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_motifAbsenceId_fkey` FOREIGN KEY (`motifAbsenceId`) REFERENCES `MotifAbsence`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_affaireId_fkey` FOREIGN KEY (`affaireId`) REFERENCES `Affaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `Entite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_semaineId_fkey` FOREIGN KEY (`semaineId`) REFERENCES `Semaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Semaine` ADD CONSTRAINT `Semaine_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Semaine` ADD CONSTRAINT `Semaine_etatSemaineId_fkey` FOREIGN KEY (`etatSemaineId`) REFERENCES `EtatSemaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
