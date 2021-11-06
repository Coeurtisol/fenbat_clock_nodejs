import prisma from "./Prisma.js";

const { user } = prisma;

export default class User {
  constructor({ firstname, lastname, accessCode }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.accessCode = accessCode;
  }

  save = async () => {
    const data = await user.create({
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
    const user = await user.findUnique({
      where: {
        id,
      },
    });
    console.log("findById", user);
    return user;
  };

  static findAll = async () => {
    const data = await user.findMany({
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
    const data = await user.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };

  // static findAllByDay = async (date) => {
  //   const data = await user.findMany({
  //     include: {
  //       pointages: {
  //         where: {
  //           sessionStart: {
  //             gte: new Date(date),
  //           },
  //         },
  //       },
  //     },
  //   });
  //   console.log("findAllByDay", data);
  //   return data;
  // };
}
