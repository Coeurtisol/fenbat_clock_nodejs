import prisma from "./Prisma.js";

const { clientAffaire } = prisma;

export default class ClientAffaire {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  save = async () => {
    await clientAffaire.create({
      data: {
        name: this.name,
      },
    });
  };

  update = async () => {
    await clientAffaire.update({
      where: {
        id: this.id,
      },
      data: {
        name: this.name,
      },
    });
  };

  static findAll = async () => {
    const clientsAffaire = await clientAffaire.findMany({
      select: {
        id: true,
        name: true,
        affaires: true,
      },
    });
    // console.log("clientsAffaire_findAll", clientsAffaire);
    return clientsAffaire;
  };

  static delete = async (id) => {
    const data = await clientAffaire.delete({
      where: {
        id,
      },
    });
    // console.log("delete", data);
    return data;
  };
}
