import prisma from "./Prisma.js";

const { workSession } = prisma;

export default class WorkSession {
  constructor({ sessionStart, workerId }) {
    this.sessionStart = sessionStart;
    this.workerId = workerId;
  }
  save = async () => {
    const data = workSession.create({
      data: {
        sessionStart: this.sessionStart,
        workerId: this.workerId,
      },
    });
    console.log("save workSession", data);
    return data;
  };

  static update = async ({id, sessionEnd }) => {
    const data = workSession.update({
      where: {
        id
      },
      data: {
        sessionEnd,
      },
    });
    console.log("update workSession", data);
    return data;
  };
}
