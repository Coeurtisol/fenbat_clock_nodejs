import prisma from "./Prisma.js";

const { worker } = prisma;

export default class User {
  constructor({ firstname, lastname, accessCode }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.accessCode = accessCode;
  }

  save = async () => {
    const data = await worker.create({
      data: {
        firstname: this.firstname,
        lastname: this.lastname,
        accessCode: this.accessCode,
      },
    });
    console.log("save", data);
    return data;
  };

  static findById = async (id) => {
    const user = await worker.findUnique({
      where: {
        id,
      },
    });
    console.log("findById", user);
    return user;
  };

  static findAll = async () => {
    const data = await worker.findMany({
      select : {
        id : true,
        firstname : true,
        lastname : true
      }
    });
    console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await worker.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };

  static findAllByDay = async (date) => {
    const data = await worker.findMany({
      include: {
        workSessions: {
          where: {
            sessionStart: {
              gte: new Date(date),
            },
          },
        },
      },
    });
    console.log("findAllByDay", data);
    return data;
  };
}
