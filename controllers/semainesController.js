import Semaine from "../models/Semaine.js";

export async function create(req, res) {
  const semaine = req.body;
  try {
    const newSemaine = new Semaine(semaine);
    const data = await newSemaine.save();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const { semaineFin } = req.body;
  try {
    const data = await Semaine.update({ id, semaineFin });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
