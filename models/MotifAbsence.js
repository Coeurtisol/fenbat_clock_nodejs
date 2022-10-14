import prisma from "./Prisma.js";

const { motifAbsence } = prisma;

export default class MotifAbsence {
  constructor({ id, name, bloquant }) {
    this.id = id;
    this.name = name;
    this.bloquant = bloquant;
  }

  save = async () => {
    await motifAbsence.create({
      data: {
        name: this.name,
        bloquant: this.bloquant,
      },
    });
  };

  update = async () => {
    await motifAbsence.update({
      where: {
        id: this.id,
      },
      data: {
        name: this.name,
        bloquant: this.bloquant,
      },
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
