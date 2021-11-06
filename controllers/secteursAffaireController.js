import SecteurAffaire from "../models/SecteurAffaire.js";

export async function getAll(req, res) {
  try {
    const secteursAffaire = await SecteurAffaire.findAll();
    res.json(secteursAffaire);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const secteurAffaire = req.body;
  try {
    const newSecteurAffaire = new SecteurAffaire(secteurAffaire);
    const data = await newSecteurAffaire.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const { updatedSecteurAffaire } = req.body;
  try {
    const data = await SecteurAffaire.update({ id, updatedSecteurAffaire });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await SecteurAffaire.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}