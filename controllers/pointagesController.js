import Pointage from "../models/Pointage.js";

export async function create(req, res) {
  const pointages = req.body;
  console.log(pointages);
  try {
    // const data = pointages.map(async (p)=>{
    //   const newPointage = new Pointage(p);
    //   return await newPointage.save();
    // })
    const newPointages = pointages.map((p) => new Pointage(p));
    let data = [];
    for (const p of newPointages) {
      data.push(await p.save());
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  // const id = Number(req.params.id);
  // const { pointageFin } = req.body;
  // try {
  //   const data = await Pointage.update({ id, pointageFin });
  //   res.json(data);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).end();
  // }
}
