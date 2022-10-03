import prisma from "./Prisma.js";

const { commande, article, fournisseur, affaire } = prisma;

export default class Commande {
  constructor({
    userId,
    firstname,
    lastname,
    articleId,
    fournisseurId,
    quantite,
    affaireId,
  }) {
    this.userId = userId;
    this.user = `${firstname} ${lastname}`;
    this.articleId = articleId;
    this.fournisseurId = Number(fournisseurId);
    this.quantite = Number(quantite);
    this.affaireId = Number(affaireId) || null;
  }

  save = async () => {
    const foundArticle = await article.findUnique({
      where: { id: this.articleId },
    });
    const foundFournisseur = await fournisseur.findUnique({
      where: { id: this.fournisseurId },
    });
    let foundAffaire;
    if (this.affaireId) {
      foundAffaire = await affaire.findUnique({
        where: { id: this.affaireId },
      });
    }
    await commande.create({
      data: {
        userId: this.userId,
        user: this.user,
        articleId: this.articleId,
        article: foundArticle.name,
        fournisseurId: this.fournisseurId,
        fournisseur: foundFournisseur.name,
        quantite: this.quantite,
        affaireId: this.affaireId,
        affaire: foundAffaire?.name || null,
      },
    });
  };

  static changerEtat = async (id, etat, valideur) => {
    await commande.update({
      where: {
        id,
      },
      data: {
        etat: etat,
        valideeLe: new Date(),
        valideePar: valideur,
      },
    });
  };

  static findAll = async () => {
    const data = await commande.findMany({
      select: {
        id: true,
        user: true,
        article: true,
        affaire: true,
        fournisseur: true,
        etat: true,
        quantite: true,
        valideeLe: true,
        valideePar: true,
      },
    });
    // console.log("findAll", data);
    return data;
  };

  static findAllByUser = async (id) => {
    const data = await commande.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        article: true,
        affaire: true,
        fournisseur: true,
        etat: true,
        quantite: true,
        valideeLe: true,
        valideePar: true,
      },
    });
    // console.log("findAllByUser", data);
    return data;
  };

  static getCountEnAttente = async () => {
    const data = await commande.count({
      where: {
        etat: "En attente",
      },
    });
    return data;
  };

  // static delete = async (id) => {
  //   await commande.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // };
}
