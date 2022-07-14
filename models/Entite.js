import prisma from "./Prisma.js";

const { entite } = prisma;

export default class Entite {
  constructor({ name, adresse, coordonnees }) {
    this.name = name;
    this.adresse = adresse;
    this.coordonnees = coordonnees;
  }

  save = async () => {
    const data = await entite.create({
      data: {
        name: this.name,
        adresse: this.adresse,
        coordonnees: this.coordonnees,
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

  static findById = async (id) => {
    const data = await entite.findUnique({ where: { id } });
    // console.log("findById", data);
    return data;
  };

  static findAll = async () => {
    const data = await entite.findMany({
      select: {
        id: true,
        name: true,
        adresse: true,
        coordonnees: true,
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
