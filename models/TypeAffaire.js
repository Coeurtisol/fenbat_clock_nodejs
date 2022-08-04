import prisma from "./Prisma.js";

const { typeAffaire } = prisma;

export default class TypeAffaire {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  save = async () => {
    await typeAffaire.create({
      data: {
        name: this.name,
      },
    });
  };

  update = async () => {
    await typeAffaire.update({
      where: {
        id: this.id,
      },
      data: {
        name: this.name,
      },
    });
  };

  static findAll = async () => {
    const typesAffaire = await typeAffaire.findMany({
      select: {
        id: true,
        name: true,
        affaires: true,
      },
    });
    // console.log("typeAffaire_findAll", typesAffaire);
    return typesAffaire;
  };

  static delete = async (id) => {
    await typeAffaire.delete({
      where: {
        id,
      },
    });
  };
}
