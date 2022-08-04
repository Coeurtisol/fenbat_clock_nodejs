import prisma from "./Prisma.js";

const { article } = prisma;

export default class Article {
  constructor({ id, name, categorieId, fournisseursId = [] }) {
    this.id = id;
    this.name = name;
    this.categorieId = Number(categorieId) || null;
    this.fournisseursId = fournisseursId.map((id) => ({ id: Number(id) }));
  }

  save = async () => {
    await article.create({
      data: {
        name: this.name,
        categorie: this.categorieId
          ? { connect: { id: this.categorieId } }
          : undefined,
        fournisseurs: {
          connect: this.fournisseursId,
        },
      },
    });
  };

  update = async () => {
    await article.update({
      where: {
        id: this.id,
      },
      data: {
        name: this.name,
        categorie: this.categorieId
          ? { connect: { id: this.categorieId } }
          : undefined,
        fournisseurs: {
          set: [],
          connect: this.fournisseursId,
        },
      },
    });
  };

  static findAll = async () => {
    const data = await article.findMany({
      select: {
        id: true,
        name: true,
        categorie: true,
        fournisseurs: true,
        _count: true,
      },
    });
    // console.log("article_findAll", data);
    return data;
  };

  static delete = async (id) => {
    await article.delete({
      where: {
        id,
      },
    });
  };
}
