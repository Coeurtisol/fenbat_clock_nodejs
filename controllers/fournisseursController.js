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
  const fournisseur = req.body;
  try {
    const newFournisseur = new Fournisseur(fournisseur);
    const data = await newFournisseur.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const  updatedFournisseur  = req.body;
  try {
    const data = await Fournisseur.update( id, updatedFournisseur );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await Fournisseur.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}