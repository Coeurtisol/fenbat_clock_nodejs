import { getDistanceByRoad } from "../apis/distanceAPI.js";
import Entite from "./Entite.js";
import prisma from "./Prisma.js";

const { affaire } = prisma;

export default class Affaire {
  constructor({
    name,
    secteurAffaireId,
    typeAffaireId,
    clientAffaireId,
    donneurAffaireId,
    etat,
    entiteId,
    adresse,
    coordonnees,
    zoneId,
  }) {
    this.name = name;
    this.secteurAffaireId = Number(secteurAffaireId);
    this.typeAffaireId = Number(typeAffaireId);
    this.clientAffaireId = Number(clientAffaireId);
    this.donneurAffaireId = Number(donneurAffaireId);
    this.etat = etat;
    this.entiteId = Number(entiteId);
    this.adresse = adresse;
    this.coordonnees = coordonnees;
    this.zoneId = zoneId;
  }

  save = async () => {
    // console.log(this);
    const data = await affaire.create({
      data: {
        name: this.name,
        secteurAffaireId: this.secteurAffaireId,
        typeAffaireId: this.typeAffaireId,
        clientAffaireId: this.clientAffaireId,
        donneurAffaireId: this.donneurAffaireId,
        etat: this.etat,
        entiteId: this.entiteId,
        adresse: this.adresse,
        coordonnees: this.coordonnees,
        zoneId: this.zoneId,
      },
    });
    // console.log("save", data);
    return data;
  };

  static update = async (id, updatedAffaire) => {
    const data = await affaire.update({
      where: {
        id,
      },
      data: updatedAffaire,
    });
    // console.log("update", data);
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
        donneurAffaire: true,
        etat: true,
        secteurAffaire: true,
        pointages: true,
        commandes: true,
        adresse: true,
        coordonnees: true,
        zone: true,
      },
    });
    // console.log("findAll", data);
    return data;
  };

  static delete = async (id) => {
    const data = await affaire.delete({
      where: {
        id,
      },
    });
    // console.log("delete", data);
    return data;
  };

  static calculZone = async (entiteId, affaireCoordonnees) => {
    let distance;
    try {
      const entite = await Entite.findById(entiteId);
      const startCoordinates = entite.coordonnees.split(",").reverse();
      const endCoordinates = affaireCoordonnees.split(",").reverse();
      distance = await getDistanceByRoad(startCoordinates, endCoordinates);
    } catch (error) {
      console.log(error);
      return null;
    }
    if (distance <= 10) {
      return 1;
    }
    if (distance <= 20) {
      return 2;
    }
    if (distance <= 30) {
      return 3;
    }
    if (distance <= 40) {
      return 4;
    }
    if (distance <= 50) {
      return 5;
    }
    return 6;
  };
}
