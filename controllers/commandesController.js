import Commande from "../models/Commande.js";

export async function getAll(req, res) {
  try {
    const commandes = await Commande.findAll();
    res.json(commandes);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const commande = req.body;
  try {
    const newCommande = new Commande(commande);
    const data = await newCommande.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const commande = req.body;
  try {
    const data = await Commande.update(id, commande);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await Commande.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}