import MotifAbsence from "../models/MotifAbsence.js";

export async function getAll(req, res) {
  try {
    const motifsAbsence = await MotifAbsence.findAll();
    res.json(motifsAbsence);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const motifAbsence = req.body;
  try {
    const newMotifAbsence = new MotifAbsence(motifAbsence);
    const data = await newMotifAbsence.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const updatedMotifAbsence = req.body;
  updatedMotifAbsence.bloquant = Number(updatedMotifAbsence.bloquant)
    ? true
    : false;
  try {
    const data = await MotifAbsence.update(id, updatedMotifAbsence);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await MotifAbsence.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
