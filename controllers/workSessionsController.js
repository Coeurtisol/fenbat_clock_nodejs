import WorkSession from "../models/WorkSession.js";

export async function create(req, res) {
  const workSession = req.body;
  try {
    const newWorkSession = new WorkSession(workSession);
    const data = await newWorkSession.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const { sessionEnd } = req.body;
  try {
    const data = await WorkSession.update({ id, sessionEnd });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
