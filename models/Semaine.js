import prisma from "./Prisma.js";

const { semaine } = prisma;

export default class Semaine {
  constructor(annee, numero, userId) {
    this.annee = annee;
    this.numero = numero;
    this.userId = userId;
    this.etatSemaineId = 1;
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
    console.log("save semaine", data);
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
    console.log("found semaine", data);
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
