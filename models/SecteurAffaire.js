import prisma from "./Prisma.js";

const { secteurAffaire } = prisma;

export default class SecteurAffaire {
  constructor({ name }) {
    this.name = name;
  }

  save = async () => {
    const data = await secteurAffaire.create({
      data: {
        name: this.name,
      },
    });
    console.log("save", data);
    return data;
  };

  static update = async ({id, secteurAffaire }) => {
    const data = await secteurAffaire.update({
      where: {
        id
      },
      data: {
        secteurAffaire,
      },
    });
    console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await secteurAffaire.findMany();
    console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await secteurAffaire.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };
}
