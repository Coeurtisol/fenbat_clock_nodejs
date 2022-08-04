import Pointage from "./Pointage.js";
import prisma from "./Prisma.js";

const { semaine } = prisma;

export default class Semaine {
  constructor(annee, numero, userId) {
    this.annee = annee;
    this.numero = numero;
    this.userId = userId;
    this.etatSemaineId = 1;
    this.pointages = Pointage.genererPointagesDUneSemaine(numero, userId);
  }

  save = async () => {
    const data = await semaine.create({
      data: {
        annee: this.annee,
        numero: this.numero,
        userId: this.userId,
        etatSemaineId: this.etatSemaineId,
        pointages: {
          create: this.pointages,
        },
      },
      select: {
        id: true,
        annee: true,
        numero: true,
        user: true,
        etatSemaine: true,
        pointages: {
          orderBy: {
            id: "asc",
          },
        },
        commentaire: true,
      },
    });
    // console.log("save semaine", data);
    return data;
  };

  static getAllByWeek = async (annee, numero) => {
    const data = await semaine.findMany({
      where: {
        annee,
        numero,
      },
      select: {
        id: true,
        annee: true,
        numero: true,
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
        etatSemaine: true,
        pointages: {
          orderBy: {
            id: "asc",
          },
        },
        commentaire: true,
        PDFemploye: true,
        PDFresponsable: true,
      },
    });
    // console.log("found semaine", data);
    return data;
  };

  static findOne = async (annee, numero, userId) => {
    const data = await semaine.findFirst({
      where: {
        annee,
        numero,
        userId,
      },
      select: {
        id: true,
        annee: true,
        numero: true,
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
        etatSemaine: true,
        pointages: {
          orderBy: {
            id: "asc",
          },
        },
        commentaire: true,
        PDFemploye: true,
        PDFresponsable: true,
      },
    });
    // console.log("found semaine", data);
    return data;
  };

  static getCountEnAttente = async (numero, etatSemaineId) => {
    const data = await semaine.count({
      where: {
        numero,
        etatSemaineId,
      },
    });
    return data;
  };

  static update = async (id, updatedSemaine) => {
    const data = await semaine.update({
      where: {
        id,
      },
      data: {
        annee: updatedSemaine.annee,
        numero: updatedSemaine.numero,
        userId: updatedSemaine.userId,
        etatSemaineId: updatedSemaine.etatSemaineId,
        affaireId: updatedSemaine.affaireId,
        commentaire: updatedSemaine.commentaire,
        PDFemploye: updatedSemaine.PDFemploye,
        PDFresponsable: updatedSemaine.PDFresponsable,
        // pointages: {
        //   updateMany: {
        //     where: {},
        //     data: updatedSemaine.pointages[0],
        //   },
        // },
      },
      select: {
        id: true,
        annee: true,
        numero: true,
        user: true,
        etatSemaine: true,
        pointages: {
          orderBy: {
            id: "asc",
          },
        },
        commentaire: true,
      },
    });
    // console.log("update semaine", data);
    return data;
  };
}
