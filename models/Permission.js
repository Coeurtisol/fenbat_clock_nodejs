import prisma from "./Prisma.js";

const { permission } = prisma;

export default class Permission {

  static getAll = async () => {
    const data = await permission.findMany();
    return data;
  };

}
