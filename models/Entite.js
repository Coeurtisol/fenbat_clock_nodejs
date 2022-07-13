import prisma from "./Prisma.js";

const { entite } = prisma;

export default class Entite {
  constructor({ name, adresse }) {
    this.name = name;
    this.adresse = adresse;
  }

  save = async () => {
    const data = await entite.create({
      data: {
        name: this.name,
        adresse: this.adresse,
      },
    });
    // console.log("save", data);
    return data;
  };

  static update = async (id, entiteData) => {
    const data = await entite.update({
      where: {
        id,
      },
      data: entiteData,
    });
    // console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await entite.findMany({
      select: {
        id: true,
        name: true,
        adresse: true,
        affaires: true,
        Users: true,
        pointages: true,
      },
    });
    // console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await entite.delete({
      where: {
        id,
      },
    });
    // console.log("delete", data);
    return data;
  };
}
