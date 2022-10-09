import prisma from "./Prisma.js";
import bcrypt from "bcrypt";

const { user } = prisma;

export default class User {
  constructor({
    id,
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
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email || null;
    this.phoneNumber = phoneNumber;
    this.accessCode = accessCode;
    this.password = password;
    this.entiteId = entiteId ? Number(entiteId) : null;
    this.roleId = roleId ? Number(roleId) : undefined;
    this.status = status ? !!Number(status) : undefined;
  }

  hashAccessCodeAndPassword = async () => {
    this.accessCode = this.accessCode
      ? await bcrypt.hash(this.accessCode, 10)
      : undefined;
    this.password = this.password
      ? await bcrypt.hash(this.password, 10)
      : undefined;
  };

  save = async () => {
    await this.hashAccessCodeAndPassword();
    await user.create({
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
            id: true,
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
        status: true,
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

  update = async () => {
    await this.hashAccessCodeAndPassword();
    await user.update({
      where: {
        id: this.id,
      },
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
      select: {
        id: true,
        firstname: true,
        lastname: true,
        entite: true,
        role: true,
      },
    });
    // console.log("updatedUser", updatedUser);
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
}
