import prisma from "./Prisma.js";

const { fournisseur, articleFournisseur } = prisma;

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

  static update = async (id, updatedournisseur) => {
    const data = await fournisseur.update({
      where: {
        id,
      },
      data: updatedournisseur,
    });
    console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await fournisseur.findMany({
      select: {
        id: true,
        name: true,
        articles: {
          select: {
            article: true,
          },
        },
        _count: true,
      },
    });
    console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await fournisseur.delete({
      where: {
        id,
      },
    });
    const deletedRelations = await articleFournisseur.deleteMany({
      where: {
        fournisseurId: id,
      },
    });
    console.log("deleted fournisseur", data);
    console.log("deleted relations", deletedRelations);
    return data;
  };
}
