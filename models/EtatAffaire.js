import prisma from "./Prisma.js";

const { etatAffaire } = prisma;

export default class EtatAffaire {
  static findAll = async () => {
    const data = await etatAffaire.findMany();
    console.log("findAll", data);
    return data;
  };
}
