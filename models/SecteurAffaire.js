import prisma from "./Prisma.js";

const { secteurAffaire } = prisma;

export default class SecteurAffaire {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  save = async () => {
    await secteurAffaire.create({
      data: {
        name: this.name,
      },
    });
  };

  update = async () => {
    await secteurAffaire.update({
      where: {
        id: this.id,
      },
      data: {
        name: this.name,
      },
    });
  };

  static findAll = async () => {
    const secteursAffaire = await secteurAffaire.findMany({
      select: {
        id: true,
        name: true,
        affaires: true,
      },
    });
    // console.log("secteursAffaire_findAll", secteursAffaire);
    return secteursAffaire;
  };

  static delete = async (id) => {
    await secteurAffaire.delete({
      where: {
        id,
      },
    });
  };
}
