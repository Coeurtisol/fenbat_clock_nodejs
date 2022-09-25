import { getDistanceByRoad } from "../apis/distanceAPI.js";
import Entite from "./Entite.js";
import prisma from "./Prisma.js";
const { affaire } = prisma;

export default class Affaire {
  constructor({
    id,
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
    this.id = id;
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
    await affaire.create({
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
  };

  update = async () => {
    await affaire.update({
      where: {
        id: this.id,
      },
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

  calculZone = async () => {
    let distance;
    try {
      const entite = await Entite.findById(this.entiteId);
      const startCoordinates = entite.coordonnees.split(",").reverse();
      const endCoordinates = this.coordonnees.split(",").reverse();
      distance = await getDistanceByRoad(startCoordinates, endCoordinates);
    } catch (error) {
      console.log(error);
      return (this.zoneId = null);
    }
    if (distance <= 10) {
      return (this.zoneId = 1);
    }
    if (distance <= 20) {
      return (this.zoneId = 2);
    }
    if (distance <= 30) {
      return (this.zoneId = 3);
    }
    if (distance <= 40) {
      return (this.zoneId = 4);
    }
    if (distance <= 50) {
      return (this.zoneId = 5);
    }
    return (this.zoneId = 6);
  };
}
