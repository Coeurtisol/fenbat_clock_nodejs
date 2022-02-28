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
    // console.log("save", data);
    return data;
  };

  static update = async (id, updatedSecteurAffaire) => {
    const data = await secteurAffaire.update({
      where: {
        id,
      },
      data: updatedSecteurAffaire,
    });
    // console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await secteurAffaire.findMany({
      select : {
        id : true,
        name : true,
        affaires : true
      }
    });
    // console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await secteurAffaire.delete({
      where: {
        id,
      },
    });
    // console.log("delete", data);
    return data;
  };
}
