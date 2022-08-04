import prisma from "./Prisma.js";

const { fournisseur, articleFournisseur } = prisma;

export default class Fournisseur {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  save = async () => {
    await fournisseur.create({
      data: {
        name: this.name,
      },
    });
  };

  update = async () => {
    await fournisseur.update({
      where: {
        id: this.id,
      },
      data: {
        name: this.name,
      },
    });
  };

  static findAll = async () => {
    const data = await fournisseur.findMany({
      select: {
        id: true,
        name: true,
        articles: true,
        _count: true,
      },
    });
    // console.log("fournisseur_findAll", data);
    return data;
  };

  static delete = async (id) => {
    await fournisseur.delete({
      where: {
        id,
      },
    });
  };
}
