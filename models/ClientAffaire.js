import prisma from "./Prisma.js";

const { clientAffaire } = prisma;

export default class ClientAffaire {
  constructor({ name }) {
    this.name = name;
  }

  save = async () => {
    const data = await clientAffaire.create({
      data: {
        name: this.name,
      },
    });
    console.log("save", data);
    return data;
  };

  static update = async (id, updatedClientAffaire) => {
    const data = await clientAffaire.update({
      where: {
        id,
      },
      data: updatedClientAffaire,
    });
    console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await clientAffaire.findMany();
    console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await clientAffaire.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };
}
