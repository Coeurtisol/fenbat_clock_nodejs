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
    // CREATION DES RELATIONS
    if (this.fournisseurs.length) {
      const assignments = this.fournisseurs.map((f) => {
        return { fournisseurId: f, articleId: data.id };
      });
      await articleFournisseur.createMany({
        data: assignments,
      });
    }
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
    // SUPPRESSION DES RELATIONS EXISTANTES
    await articleFournisseur.deleteMany({
      where: {
        articleId: id,
      },
    });
    // RECREATION DES RELATIONS
    if (this.fournisseurs.length) {
      const assignments = this.fournisseurs.map((f) => {
        return { fournisseurId: f, articleId: id };
      });
      await articleFournisseur.createMany({
        skipDuplicates: true,
        data: assignments,
      });
    }
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
        _count: true,
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
    // delete on cascade (voir schema.prisma ArticleFournisseur)
    // SUPPRESSION DES RELATIONS
    // await articleFournisseur.deleteMany({
    //   where: {
    //     articleId: id,
    //   },
    // });
    return data;
  };
}
