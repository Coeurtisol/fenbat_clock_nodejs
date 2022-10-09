import EtatSemaine from "../models/EtatSemaine.js";

export async function getAll(req, res) {
  try {
    const data = await EtatSemaine.getAll();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
