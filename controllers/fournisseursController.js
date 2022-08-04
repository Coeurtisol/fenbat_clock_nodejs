import Fournisseur from "../models/Fournisseur.js";

export async function getAll(req, res) {
  try {
    const fournisseurs = await Fournisseur.findAll();
    res.json(fournisseurs);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const data = req.body;
  try {
    const fournisseur = new Fournisseur(data);
    await fournisseur.save();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const fournisseur = new Fournisseur({ id, ...data });
    await fournisseur.update();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    await Fournisseur.delete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
