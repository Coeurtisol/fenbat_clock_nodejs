import prisma from "./Prisma.js";

const { typeAffaire } = prisma;

export default class TypeAffaire {
  constructor({ name }) {
    this.name = name;
  }

  save = async () => {
    const data = await typeAffaire.create({
      data: {
        name: this.name,
      },
    });
    // console.log("save", data);
    return data;
  };

  static update = async (id, updatedTypeAffaire) => {
    const data = await typeAffaire.update({
      where: {
        id,
      },
      data: updatedTypeAffaire,
    });
    // console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await typeAffaire.findMany({
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
    const data = await typeAffaire.delete({
      where: {
        id,
      },
    });
    // console.log("delete", data);
    return data;
  };
}
