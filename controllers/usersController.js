import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwtPKG from "jsonwebtoken";
const Jwt = jwtPKG;

export async function create(req, res) {
  const { firstname, lastname, accessCode } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(accessCode, 10);
    const newUser = { firstname, lastname, accessCode: hashedPassword };
    const user = new User(newUser);
    const data = await user.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
  // res.send("test");
}

export async function login(req, res) {
  const { id, password } = req.body;
  console.log(id, password);

  const user = await User.findById(id);
  if (!user) {
    res.send("Utilisateur introuvable");
    return;
  }

  const correctPassword = await bcrypt.compare(password, user.accessCode);
  if (!correctPassword) {
    res.status(403);
    res.end();
    return;
  }

  //   const payload = { id, name: user.name, role:user.role };
  const payload = { id, firsname: user.firstname, lastname: user.lastname };
  const secretKey = process.env.KEY;
  const options = { expiresIn: 60 * 2 }; // 2 minutes
  const token = Jwt.sign(payload, secretKey, options);
  res.send(token);
}

export async function findAll(req, res) {
  console.log(new Date());
  try {
    const workers = await User.findAll();
    res.json(workers);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const { id } = req.params;
  try {
    const data = await User.delete(Number(id));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function findAllByDay(req, res) {
  try {
    const { date } = req.params;
    const data = await User.findAllByDay(date);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
