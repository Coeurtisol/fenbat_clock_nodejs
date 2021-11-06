import prisma from "./Prisma.js";

const { categorie } = prisma;

export default class Categorie {
  constructor({ name }) {
    this.name = name;
  }

  save = async () => {
    const data = await categorie.create({
      data: {
        name: this.name,
      },
    });
    console.log("save", data);
    return data;
  };

  static update = async ({ id, categorie }) => {
    const data = await categorie.update({
      where: {
        id,
      },
      data: {
        categorie,
      },
    });
    console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await categorie.findMany({
      select: {
        id: true,
        name: true,
        articles: true,
      },
    });
    console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await categorie.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };
}
