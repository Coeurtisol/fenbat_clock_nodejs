import prisma from "./Prisma.js";

const { fournisseur } = prisma;

export default class Fournisseur {
  constructor({ name }) {
    this.name = name;
  }

  save = async () => {
    const data = await fournisseur.create({
      data: {
        name: this.name,
      },
    });
    console.log("save", data);
    return data;
  };

  static update = async ({id, fournisseur }) => {
    const data = await fournisseur.update({
      where: {
        id
      },
      data: {
        fournisseur,
      },
    });
    console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await fournisseur.findMany();
    console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await fournisseur.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };
}
