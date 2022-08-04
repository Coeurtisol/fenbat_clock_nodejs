import prisma from "./Prisma.js";

const { motifAbsence } = prisma;

export default class MotifAbsence {
  constructor({ name, bloquant }) {
    this.name = name;
    this.bloquant = Number(bloquant) ? true : false;
  }

  save = async () => {
    await motifAbsence.create({
      data: {
        name: this.name,
        bloquant: this.bloquant,
      },
    });
  };

  static update = async (id, updatedMotifAbsence) => {
    await motifAbsence.update({
      where: {
        id,
      },
      data: updatedMotifAbsence,
    });
  };

  static findAll = async () => {
    const motifsAbsence = await motifAbsence.findMany({
      select: {
        id: true,
        name: true,
        pointages: true,
        bloquant: true,
      },
    });
    // console.log("motifsAbsence_findAll", motifsAbsence);
    return motifsAbsence;
  };

  static delete = async (id) => {
    await motifAbsence.delete({
      where: {
        id,
      },
    });
  };
}
