import prisma from "./Prisma.js";

const { motifAbsence } = prisma;

export default class MotifAbsence {
  constructor({ name, bloquant }) {
    this.name = name;
    this.bloquant = Number(bloquant) ? true : false;
  }

  save = async () => {
    const data = await motifAbsence.create({
      data: {
        name: this.name,
        bloquant: this.bloquant,
      },
    });
    console.log("save", data);
    return data;
  };

  static update = async (id, updatedMotifAbsence) => {
    const data = await motifAbsence.update({
      where: {
        id,
      },
      data: updatedMotifAbsence,
    });
    console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await motifAbsence.findMany();
    console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await motifAbsence.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };
}
