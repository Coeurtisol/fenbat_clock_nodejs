import prisma from "./Prisma.js";

const { user } = prisma;

export default class User {
  constructor({
    firstname,
    lastname,
    email,
    phoneNumber,
    accessCode,
    password,
    entiteId,
    roleId,
  }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.accessCode = accessCode;
    this.password = password;
    this.entiteId = entiteId;
    this.roleId = roleId;
  }

  save = async () => {
    const data = await user.create({
      data: {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phoneNumber: this.phoneNumber,
        accessCode: this.accessCode,
        password: this.password,
        entiteId: this.entiteId,
        roleId: this.roleId,
      },
    });
    // console.log("save", data);
    return data;
  };

  static login = async (id) => {
    const userFound = await user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        accessCode: true,
        firstname: true,
        lastname: true,
        role: true,
        entite: true,
        status: true,
      },
    });
    console.log("login", userFound);
    return userFound;
  };

  static externalLogin = async (email) => {
    const userFound = await user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        firstname: true,
        lastname: true,
        role: true,
        entite: true,
        status: true,
      },
    });
    console.log("login", userFound);
    return userFound;
  };

  static findById = async (id) => {
    const userFound = await user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phoneNumber: true,
        entite: true,
        role: true,
      },
    });
    // console.log("findById", userFound);
    return userFound;
  };

  static findAll = async () => {
    const data = await user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phoneNumber: true,
        entite: true,
        role: true,
        pointages: true,
        commandes: true,
      },
    });
    // console.log("findAll", data);
    return data;
  };

  static findAllActive = async () => {
    const data = await user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        role: true,
      },
    });
    return data;
  };

  static update = async (id, updatedUser) => {
    const data = await user.update({
      where: {
        id,
      },
      data: updatedUser,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        entite: true,
        role: true,
      },
    });
    // console.log("update", data);
    return data;
  };

  static delete = async (id) => {
    const data = await user.delete({
      where: {
        id,
      },
    });
    // console.log("delete", data);
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
