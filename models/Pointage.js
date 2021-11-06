import prisma from "./Prisma.js";

const { pointage } = prisma;

export default class Pointage {
  constructor({ pointageDebut, userId }) {
    this.sessionStart = pointageDebut;
    this.userId = userId;
  }
  save = async () => {
    const data = await pointage.create({
      data: {
        sessionStart: this.sessionStart,
        userId: this.userId,
      },
    });
    console.log("save pointage", data);
    return data;
  };

  static update = async ({id, pointageFin }) => {
    const data = await pointage.update({
      where: {
        id
      },
      data: {
        sessionEnd:pointageFin,
      },
    });
    console.log("update pointage", data);
    return data;
  };
}