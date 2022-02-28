import prisma from "./Prisma.js";

const { article, articleFournisseur } = prisma;

export default class Article {
  constructor({ name, categorieId, fournisseurs = [] }) {
    this.name = name;
    this.categorieId = Number(categorieId) || null;
    this.fournisseurs = fournisseurs.map(Number);
  }

  save = async () => {
    const data = await article.create({
      data: {
        name: this.name,
        categorieId: this.categorieId,
      },
    });
    if (this.fournisseurs.length) {
      const assignments = this.fournisseurs.map((f) => {
        return { fournisseurId: f, articleId: data.id };
      });
      const data2 = await articleFournisseur.createMany({
        data: assignments,
      });
      // console.log("save2", data2);
    }
    // console.log("save1", data);
    return data;
  };

  update = async (id) => {
    const data = await article.update({
      where: {
        id,
      },
      data: {
        name: this.name,
        categorieId: this.categorieId,
      },
    });
    const deletedRelations = await articleFournisseur.deleteMany({
      where: {
        articleId: id,
      },
    });
    // console.log("deleted relations", deletedRelations);
    if (this.fournisseurs.length) {
      const assignments = this.fournisseurs.map((f) => {
        return { fournisseurId: f, articleId: id };
      });
      const data2 = await articleFournisseur.createMany({
        skipDuplicates: true,
        data: assignments,
      });
      // console.log("save2", data2);
    }
    // console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await article.findMany({
      select: {
        id: true,
        name: true,
        categorie: true,
        fournisseurs: {
          select: {
            fournisseur: true,
          },
        },
      },
    });
    // console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await article.delete({
      where: {
        id,
      },
    });
    const deletedRelations = await articleFournisseur.deleteMany({
      where: {
        articleId: id,
      },
    });
    // console.log("deleted article", data);
    // console.log("deleted relations", deletedRelations);
    return data;
  };
}
