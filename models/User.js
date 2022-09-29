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
    status,
  }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email || null;
    this.phoneNumber = phoneNumber;
    this.accessCode = accessCode;
    this.password = password;
    this.entiteId = entiteId;
    this.roleId = roleId;
    this.status = Number(status) ? true : false;
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
        status: this.status,
      },
    });
    // console.log("save", data);
    return data;
  };

  /**
   * @param { "id" | "email" } identifier
   * @param { number | string } value
   * @returns
   */
  static findUniqueForLogin = async (identifier, value) => {
    const userFound = await user.findUnique({
      where: {
        [identifier]: value,
      },
      select: {
        id: true,
        accessCode: true,
        password: true,
        firstname: true,
        lastname: true,
        role: {
          select: {
            name: true,
            permissionId: true,
          },
        },
        entite: {
          select: {
            id: true,
          },
        },
        status: true,
      },
    });
    // console.log("findUnique", userFound);
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
        status: true,
      },
    });
    // console.log("findAll", data);
    return data;
  };

  static findAllActive = async () => {
    const data = await user.findMany({
      where: {
        status: true,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        role: {
          select: {
            name: true,
          },
        },
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
