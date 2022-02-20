import prisma from "./Prisma.js";

const { commande } = prisma;

export default class Commande {
  constructor({ articleId, fournisseurId, quantite, etat, affaireId, userId }) {
    this.userId = userId;
    this.articleId = articleId;
    this.fournisseurId = Number(fournisseurId);
    this.quantite = quantite;
    this.etat = etat;
    this.affaireId = Number(affaireId) || null;
  }

  save = async () => {
    const data = await commande.create({
      data: {
        userId: this.userId,
        articleId: this.articleId,
        affaireId: this.affaireId,
        fournisseurId: this.fournisseurId,
        quantite: this.quantite,
        etat: this.etat,
        affaireId: this.affaireId,
      },
    });
    console.log("save", data);
    return data;
  };

  static valider = async (id) => {
    const data = await commande.update({
      where: {
        id,
      },
      data: {
        etat: true,
      },
    });
    console.log("update", data);
    return data;
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
      },
    });
    console.log("findAll", data);
    return data;
  };

  static findAllByUser = async (id) => {
    const data = await commande.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        user: true,
        article: true,
        affaire: true,
        fournisseur: true,
        etat: true,
        quantite: true,
      },
    });
    console.log("findAllByUser", data);
    return data;
  };

  static delete = async (id) => {
    const data = await commande.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };
}
