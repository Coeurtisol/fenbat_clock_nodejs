import EtatAffaire from "../models/EtatAffaire.js";

export async function getAll(req, res) {
  try {
    const etatsAffaire = await EtatAffaire.findAll();
    res.json(etatsAffaire);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}