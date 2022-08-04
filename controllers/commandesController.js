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

export async function getAllByUser(req, res) {
  const userId = Number(req.params.userId);
  try {
    const commandes = await Commande.findAllByUser(userId);
    res.json(commandes);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const data = req.body;
  try {
    const commande = new Commande(data);
    await commande.save();
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function changeEtat(req, res) {
  const id = Number(req.params.id);
  const { etat } = req.body;
  const { firstname, lastname } = res.locals.user;
  const valideur = firstname + " " + lastname;
  try {
    await Commande.changerEtat(id, etat, valideur);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

// export async function deleteOne(req, res) {
//   const id = Number(req.params.id);
//   try {
//     await Commande.delete(id);
//     res.status(204).end();
//   } catch (error) {
//     console.log(error);
//     res.status(500).end();
//   }
// }

export async function getNumberCommandesEnAttente(req, res) {
  try {
    const count = await Commande.getCountEnAttente();
    res.json(count);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
