import prisma from "./Prisma.js";

const { affaire } = prisma;

export default class Affaire {
  constructor({ name, secteurAffaireId, typeAffaireId, clientAffaireId, etat, entiteId }) {
    this.name = name;
    this.secteurAffaireId = Number(secteurAffaireId);
    this.typeAffaireId = Number(typeAffaireId);
    this.clientAffaireId = Number(clientAffaireId);
    this.etat = etat;
    this.entiteId = Number(entiteId);
  }

  save = async () => {
    console.log(this);
    const data = await affaire.create({
      data: {
        name: this.name,
        secteurAffaireId: this.secteurAffaireId,
        typeAffaireId: this.typeAffaireId,
        clientAffaireId: this.clientAffaireId,
        etat: this.etat,
        entiteId: this.entiteId,
      },
    });
    console.log("save", data);
    return data;
  };

  static update = async (id, updatedAffaire) => {
    const data = await affaire.update({
      where: {
        id,
      },
      data: updatedAffaire,
    });
    console.log("update", data);
    return data;
  };

  static findAll = async () => {
    const data = await affaire.findMany({
      select: {
        id: true,
        name: true,
        entite: true,
        typeAffaire: true,
        clientAffaire: true,
        etat: true,
        secteurAffaire: true,
      },
    });
    console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await affaire.delete({
      where: {
        id,
      },
    });
    console.log("delete", data);
    return data;
  };
}
