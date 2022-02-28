import prisma from "./Prisma.js";

const { donneurAffaire } = prisma;

export default class DonneurAffaire {
  constructor({ name }) {
    this.name = name;
  }

  save = async () => {
    const data = await donneurAffaire.create({
      data: {
        name: this.name,
      },
    });
    // console.log("save", data);
    return data;
  };

  static update = async (id, updatedDonneurAffaire) => {
    const data = await donneurAffaire.update({
      where: {
        id,
      },
      data: updatedDonneurAffaire,
    });
    // console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await donneurAffaire.findMany({
      select: {
        id: true,
        name: true,
        affaires: true,
      },
    });
    // console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await donneurAffaire.delete({
      where: {
        id,
      },
    });
    // console.log("delete", data);
    return data;
  };
}
