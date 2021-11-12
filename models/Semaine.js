import prisma from "./Prisma.js";

const { semaine } = prisma;

export default class Semaine {
  constructor({ etatSemaineId, userId, commentaire, pointages }) {
    this.etatSemaineId = etatSemaineId;
    this.userId = userId;
    this.commentaire = commentaire;
    this.pointages = pointages;
  }

  save = async () => {
    const data = await semaine.create({
      data: {
        etatSemaineId: this.etatSemaineId,
        userId: this.userId,
        commentaire: this.commentaire,
        pointages: {
          create: this.pointages,
        },
      },
    });
    console.log("save semaine", data);
    return data;
  };

  static update = async ({ id, semaineFin }) => {
    const data = await semaine.update({
      where: {
        id,
      },
      data: {
        sessionEnd: semaineFin,
      },
    });
    console.log("update semaine", data);
    return data;
  };
}
