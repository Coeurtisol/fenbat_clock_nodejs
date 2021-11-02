import Pointage from "../models/Pointage.js";

export async function create(req, res) {
  const workSession = req.body;
  try {
    const newWorkSession = new Pointage(workSession);
    const data = await newWorkSession.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const { pointageFin } = req.body;
  try {
    const data = await Pointage.update({ id, pointageFin });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
