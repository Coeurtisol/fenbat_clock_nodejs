-- DropIndex
DROP INDEX `_articletofournisseur_fournisseurId_fkey` ON `_articletofournisseur`;

-- DropIndex
DROP INDEX `affaire_clientAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `affaire_donneurAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `affaire_entiteId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `affaire_secteurAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `affaire_typeAffaireId_fkey` ON `affaire`;

-- DropIndex
DROP INDEX `article_categorieId_fkey` ON `article`;

-- DropIndex
DROP INDEX `commande_affaireId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `commande_articleId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `commande_fournisseurId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `commande_userId_fkey` ON `commande`;

-- DropIndex
DROP INDEX `pointage_affaireId_fkey` ON `pointage`;

-- DropIndex
DROP INDEX `pointage_entiteId_fkey` ON `pointage`;

-- DropIndex
DROP INDEX `pointage_motifAbsenceId_fkey` ON `pointage`;

-- DropIndex
DROP INDEX `pointage_semaineId_fkey` ON `pointage`;

-- DropIndex
DROP INDEX `pointage_userId_fkey` ON `pointage`;

-- DropIndex
DROP INDEX `role_permissionId_fkey` ON `role`;

-- DropIndex
DROP INDEX `semaine_etatSemaineId_fkey` ON `semaine`;

-- DropIndex
DROP INDEX `semaine_userId_fkey` ON `semaine`;

-- DropIndex
DROP INDEX `user_entiteId_fkey` ON `user`;

-- DropIndex
DROP INDEX `user_roleId_fkey` ON `user`;

-- AddForeignKey
ALTER TABLE `affaire` ADD CONSTRAINT `affaire_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `entite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `affaire` ADD CONSTRAINT `affaire_typeAffaireId_fkey` FOREIGN KEY (`typeAffaireId`) REFERENCES `typeaffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `affaire` ADD CONSTRAINT `affaire_secteurAffaireId_fkey` FOREIGN KEY (`secteurAffaireId`) REFERENCES `secteuraffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `affaire` ADD CONSTRAINT `affaire_clientAffaireId_fkey` FOREIGN KEY (`clientAffaireId`) REFERENCES `clientaffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `affaire` ADD CONSTRAINT `affaire_donneurAffaireId_fkey` FOREIGN KEY (`donneurAffaireId`) REFERENCES `donneuraffaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role` ADD CONSTRAINT `role_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `entite`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointage` ADD CONSTRAINT `pointage_entiteId_fkey` FOREIGN KEY (`entiteId`) REFERENCES `entite`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointage` ADD CONSTRAINT `pointage_affaireId_fkey` FOREIGN KEY (`affaireId`) REFERENCES `affaire`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointage` ADD CONSTRAINT `pointage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointage` ADD CONSTRAINT `pointage_motifAbsenceId_fkey` FOREIGN KEY (`motifAbsenceId`) REFERENCES `motifabsence`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointage` ADD CONSTRAINT `pointage_semaineId_fkey` FOREIGN KEY (`semaineId`) REFERENCES `semaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `semaine` ADD CONSTRAINT `semaine_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `semaine` ADD CONSTRAINT `semaine_etatSemaineId_fkey` FOREIGN KEY (`etatSemaineId`) REFERENCES `etatsemaine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_affaireId_fkey` FOREIGN KEY (`affaireId`) REFERENCES `affaire`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_fournisseurId_fkey` FOREIGN KEY (`fournisseurId`) REFERENCES `fournisseur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `categorie`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_articletofournisseur` ADD CONSTRAINT `_articletofournisseur_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_articletofournisseur` ADD CONSTRAINT `_articletofournisseur_fournisseurId_fkey` FOREIGN KEY (`fournisseurId`) REFERENCES `fournisseur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
