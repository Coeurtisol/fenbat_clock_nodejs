import prisma from "./Prisma.js";

const { commande } = prisma;

export default class Commande {
  constructor({ articleId, fournisseurId, quantite, etat, affaireId, userId }) {
    this.userId = userId;
    this.articleId = articleId;
    this.fournisseurId = Number(fournisseurId);
    this.quantite = Number(quantite);
    this.etat = etat;
    this.affaireId = Number(affaireId) || null;
  }

  save = async () => {
    await commande.create({
      data: {
        userId: this.userId,
        articleId: this.articleId,
        affaireId: this.affaireId,
        fournisseurId: this.fournisseurId,
        quantite: this.quantite,
        etat: this.etat,
        affaireId: this.affaireId,
        valideeLe: null,
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
        user: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        article: {
          select: {
            name: true,
          },
        },
        affaire: {
          select: {
            name: true,
          },
        },
        fournisseur: {
          select: {
            name: true,
          },
        },
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
        article: {
          select: {
            name: true,
          },
        },
        affaire: {
          select: {
            name: true,
          },
        },
        fournisseur: {
          select: {
            name: true,
          },
        },
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
