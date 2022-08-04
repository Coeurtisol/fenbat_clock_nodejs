import prisma from "./Prisma.js";

const { donneurAffaire } = prisma;

export default class DonneurAffaire {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  save = async () => {
    await donneurAffaire.create({
      data: {
        name: this.name,
      },
    });
  };

  update = async () => {
    await donneurAffaire.update({
      where: {
        id: this.id,
      },
      data: {
        name: this.name,
      },
    });
  };

  static findAll = async () => {
    const donneursAffaire = await donneurAffaire.findMany({
      select: {
        id: true,
        name: true,
        affaires: true,
      },
    });
    // console.log("donneursAffaire_findAll", donneursAffaire);
    return donneursAffaire;
  };

  static delete = async (id) => {
    await donneurAffaire.delete({
      where: {
        id,
      },
    });
  };
}
