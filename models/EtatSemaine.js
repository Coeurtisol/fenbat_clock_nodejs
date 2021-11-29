import prisma from "./Prisma.js";

const { etatSemaine } = prisma;

export default class EtatSemaine {

  static getAll = async () => {
    const data = await etatSemaine.findMany();
    return data;
  };

}
