import prisma from "./Prisma.js";

const { article } = prisma;

export default class Article {
  constructor({ name, categorieId = null }) {
    this.name = name;
    this.categorieId = categorieId;
  }

  save = async () => {
    const data = await article.create({
      data: {
        name: this.name,
        categorieId: this.categorieId,
      },
    });
    console.log("save", data);
    return data;
  };

  static update = async (id, updatedArticle) => {
    const data = await article.update({
      where: {
        id,
      },
      data: updatedArticle,
    });
    console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await article.findMany({
      select: {
        id: true,
        name: true,
        categorie: true,
      },
    });
    console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await article.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };
}
