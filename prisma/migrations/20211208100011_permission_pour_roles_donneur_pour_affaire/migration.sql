/*
  Warnings:

  - Added the required column `donneurAffaireId` to the `Affaire` table without a default value. This is not possible if the table is not empty.
  - Made the column `clientAffaireId` on table `affaire` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `permissionId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Affaire_clientAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Affaire_entiteId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Affaire_secteurAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Affaire_typeAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Article_categorieId_fkey` ON `article`;

-- DropIndex
DROP INDEX `Commande_affaireId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `Commande_articleId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `Commande_fournisseurId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `Commande_userId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `Pointage_affaireId_fkey` ON `pointage`;

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
ALTER TABLE `affaire` ADD COLUMN `donneurAffaireId` INTEGER NOT NULL,
    MODIFY `clientAffaireId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `permissionId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `DonneurAffaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_secteurAffaireId_fkey` FOREIGN KEY (`secteurAffaireId`) REFERENCES `SecteurAffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_typeAffaireId_fkey` FOREIGN KEY (`typeAffaireId`) REFERENCES `TypeAffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_clientAffaireId_fkey` FOREIGN KEY (`clientAffaireId`) REFERENCES `ClientAffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_donneurAffaireId_fkey` FOREIGN KEY (`donneurAffaireId`) REFERENCES `DonneurAffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `Entite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `Entite`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_motifAbsenceId_fkey` FOREIGN KEY (`motifAbsenceId`) REFERENCES `MotifAbsence`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_affaireId_fkey` FOREIGN KEY (`affaireId`) REFERENCES `Affaire`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `Entite`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pointage` ADD CONSTRAINT `Pointage_semaineId_fkey` FOREIGN KEY (`semaineId`) REFERENCES `Semaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Semaine` ADD CONSTRAINT `Semaine_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Semaine` ADD CONSTRAINT `Semaine_etatSemaineId_fkey` FOREIGN KEY (`etatSemaineId`) REFERENCES `EtatSemaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_fournisseurId_fkey` FOREIGN KEY (`fournisseurId`) REFERENCES `Fournisseur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_affaireId_fkey` FOREIGN KEY (`affaireId`) REFERENCES `Affaire`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToFournisseur` ADD FOREIGN KEY (`A`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToFournisseur` ADD FOREIGN KEY (`B`) REFERENCES `Fournisseur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
