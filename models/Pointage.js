import prisma from "./Prisma.js";

const { workSession } = prisma;

export default class Pointage {
  constructor({ pointageDebut, workerId }) {
    this.sessionStart = pointageDebut;
    this.workerId = workerId;
  }
  save = async () => {
    const data = await workSession.create({
      data: {
        sessionStart: this.sessionStart,
        workerId: this.workerId,
      },
    });
    console.log("save workSession", data);
    return data;
  };

  static update = async ({id, pointageFin }) => {
    const data = await workSession.update({
      where: {
        id
      },
      data: {
        sessionEnd:pointageFin,
      },
    });
    console.log("update workSession", data);
    return data;
  };
}