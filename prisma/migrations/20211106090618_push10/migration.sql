-- DropIndex
DROP INDEX `Affaire_entiteId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Affaire_secteurAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `Affaire_typeAffaireId_fkey` ON `affaire`;

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

-- CreateTable
CREATE TABLE `Commande` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,
    `fournisseurId` INTEGER NOT NULL,
    `quantite` INTEGER NOT NULL,
    `etat` BOOLEAN NOT NULL,
    `affaireId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `categorieId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fournisseur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArticleToFournisseur` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArticleToFournisseur_AB_unique`(`A`, `B`),
    INDEX `_ArticleToFournisseur_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_secteurAffaireId_fkey` FOREIGN KEY (`secteurAffaireId`) REFERENCES `SecteurAffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affaire` ADD CONSTRAINT `Affaire_typeAffaireId_fkey` FOREIGN KEY (`typeAffaireId`) REFERENCES `TypeAffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_fournisseurId_fkey` FOREIGN KEY (`fournisseurId`) REFERENCES `Fournisseur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_affaireId_fkey` FOREIGN KEY (`affaireId`) REFERENCES `Affaire`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToFournisseur` ADD FOREIGN KEY (`A`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToFournisseur` ADD FOREIGN KEY (`B`) REFERENCES `Fournisseur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
