import prisma from "./Prisma.js";

const { categorie } = prisma;

export default class Categorie {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  save = async () => {
    await categorie.create({
      data: {
        name: this.name,
      },
    });
  };

  update = async () => {
    await categorie.update({
      where: {
        id : this.id,
      },
      data: {
        name: this.name,
      },
    });
  };

  static findAll = async () => {
    const data = await categorie.findMany({
      select: {
        id: true,
        name: true,
        articles: true,
      },
    });
    // console.log("categorie_findAll", data);
    return data;
  };

  static delete = async (id) => {
    await categorie.delete({
      where: {
        id,
      },
    });
  };
}
