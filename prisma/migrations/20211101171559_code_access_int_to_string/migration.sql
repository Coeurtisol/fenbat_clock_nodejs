-- DropIndex
DROP INDEX `WorkSession_workerId_fkey` ON `worksession`;

-- AlterTable
ALTER TABLE `worker` MODIFY `accessCode` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `WorkSession` ADD CONSTRAINT `WorkSession_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
