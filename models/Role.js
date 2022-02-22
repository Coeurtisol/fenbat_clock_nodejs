import prisma from "./Prisma.js";

const { role } = prisma;

export default class Role {
  constructor({ name, permissionId }) {
    this.name = name;
    this.permissionId = Number(permissionId);
  }

  save = async () => {
    const data = await role.create({
      data: {
        name: this.name,
        permissionId: this.permissionId,
      },
    });
    // console.log("save", data);
    return data;
  };

  static update = async (id, roleData) => {
    const data = await role.update({
      where: {
        id,
      },
      data: roleData,
    });
    // console.log("update", data);
    return data;
  };

  static getAll = async () => {
    const data = await role.findMany({
      select: {
        id: true,
        name: true,
        permission: {
          select: { id: true, name: true },
        },
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    // console.log("getAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await role.delete({
      where: {
        id,
      },
    });
    // console.log("delete", data);
    return data;
  };
}
