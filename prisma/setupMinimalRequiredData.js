import prismaClient from "../models/Prisma.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const etatsSemaine = [
  { id: 1, name: "En saisie" },
  { id: 2, name: "En attente de validation" },
  { id: 3, name: "Validé par responsable de production" },
  { id: 4, name: "Validé par responsable de site" },
  { id: 5, name: "Refusé" },
];

const motifsAbsence = [
  { id: 1, name: "Maternité	", bloquant: true },
  { id: 2, name: "Paternité", bloquant: true },
  { id: 3, name: "Maladie", bloquant: true },
  { id: 4, name: "Formation", bloquant: false },
  { id: 5, name: "Absence non-autorisée", bloquant: false },
  { id: 6, name: "Absence autorisée", bloquant: false },
  { id: 7, name: "Accident du travail", bloquant: false },
  { id: 8, name: "RTT salariés", bloquant: true },
  { id: 9, name: "RTT entreprise", bloquant: true },
];

const zones = [
  { id: 1, label: "Zone1" },
  { id: 2, label: "Zone2" },
  { id: 3, label: "Zone3" },
  { id: 4, label: "Zone4" },
  { id: 5, label: "Zone5" },
  { id: 6, label: "Zone6" },
];

const permissions = [
  { id: 1, name: "Responsable de site" },
  { id: 2, name: "Responsable de production" },
  { id: 3, name: "Chef d'équipe" },
  { id: 4, name: "Technicien" },
];

const roles = [
  { id: 1, name: "admin", permissionId: 1 },
  { id: 2, name: "Responsable de site", permissionId: 1 },
  { id: 3, name: "Responsable de production", permissionId: 2 },
  { id: 4, name: "Chef d'équipe", permissionId: 3 },
  { id: 5, name: "Technicien", permissionId: 4 },
];

const users = [
  {
    id: 1,
    firstname: "admin",
    lastname: "admin",
    accessCode: bcrypt.hashSync(
      process.env.DEFAULT_ADMIN_ACCESSCODE || "1379",
      10
    ),
    roleId: 1,
  },
];

async function main() {
  await prismaClient.etatSemaine.createMany({
    data: etatsSemaine,
    skipDuplicates: true,
  });
  await prismaClient.motifAbsence.createMany({
    data: motifsAbsence,
    skipDuplicates: true,
  });
  await prismaClient.zone.createMany({
    data: zones,
    skipDuplicates: true,
  });
  await prismaClient.permission.createMany({
    data: permissions,
    skipDuplicates: true,
  });
  await prismaClient.role.createMany({
    data: roles,
    skipDuplicates: true,
  });
  await prismaClient.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("etatSemaine", await prismaClient.etatSemaine.findMany());
  console.log("motifsAbsence", await prismaClient.motifAbsence.findMany());
  console.log("zones", await prismaClient.zone.findMany());
  console.log("permissions", await prismaClient.permission.findMany());
  console.log("roles", await prismaClient.role.findMany());
  console.log("users", await prismaClient.user.findMany());
}
main();
