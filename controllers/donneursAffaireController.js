import DonneurAffaire from "../models/DonneurAffaire.js";

export async function getAll(req, res) {
  try {
    const donneursAffaire = await DonneurAffaire.findAll();
    res.json(donneursAffaire);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const data = req.body;
  try {
    const donneurAffaire = new DonneurAffaire(data);
    await donneurAffaire.save();
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const donneurAffaire = new DonneurAffaire({ id, ...data });
    await donneurAffaire.update();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    await DonneurAffaire.delete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
