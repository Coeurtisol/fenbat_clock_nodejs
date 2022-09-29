import Pointage from "../models/Pointage.js";

export async function create(req, res) {
  const pointages = req.body;
  // console.log(pointages);
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

export async function updatePointages(pointages) {
  pointages.forEach((p) => {
    p.affaireId = p.affaireId > 0 ? +p.affaireId : null;
    p.motifAbsenceId = p.motifAbsenceId > 0 ? +p.motifAbsenceId : null;
    delete p.semaineId;
  });
  try {
    await Promise.all(pointages.map(async (p) => await Pointage.update(p.id, p)));
  } catch (error) {
    console.log(error);
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

export async function findUsersPointagesSinceDate(req, res) {
  const { date } = req.body;
  try {
    const data = await Pointage.findUsersPointagesSinceDate(date);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
