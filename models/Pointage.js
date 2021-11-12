import prisma from "./Prisma.js";

const { pointage } = prisma;

export default class Pointage {
  constructor({
    hour,
    userId,
    motifAbsenceId,
    affaireId,
    entiteId,
    semaineId,
  }) {
    this.hour = hour;
    this.userId = userId;
    this.motifAbsenceId = motifAbsenceId;
    this.affaireId = affaireId;
    this.entiteId = entiteId;
    this.semaineId = semaineId;
  }
  save = async () => {
    const data = await pointage.create({
      data: {
        hour: this.hour,
        userId: this.userId,
        motifAbsenceId: this.motifAbsenceId,
        affaireId: this.affaireId,
        entiteId: this.entiteId,
        semaineId: this.semaineId,
      },
    });
    console.log("save pointage", data);
    return data;
  };

  static update = async ({ id, pointageFin }) => {
    // const data = await pointage.update({
    //   where: {
    //     id
    //   },
    //   data: {
    //     sessionEnd:pointageFin,
    //   },
    // });
    // console.log("update pointage", data);
    // return data;
  };
}
