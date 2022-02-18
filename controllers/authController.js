import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwtPKG from "jsonwebtoken";
const Jwt = jwtPKG;

export function isSecure(req, res) {
  const secureIP = process.env.SECURE_IP;
  const ip = req.socket.remoteAddress;
  let isSecure;
  console.log("ip client =", ip, "| ip autorisée :", secureIP);
  if (ip == secureIP) isSecure = true;
  else isSecure = false;
  return res.status(200).json({ isSecure });
}

// TODO : refactoriser les deux méthodes de login?
export async function login(req, res) {
  const { id, accessCode } = req.body;
  console.log(id, accessCode);

  const user = await User.login(id);
  if (!user) {
    return res
    .status(200)
    .json({ error: "Utilisateur introuvable" });
  }

  if (!user.status) {
    return res
    .status(200)
    .json({ error: "Compte désactivé" });
  }

  const correctAccessCode = await bcrypt.compare(accessCode, user.accessCode);
  if (!correctAccessCode) {
    return res
    .status(200)
    .json({ error: "Code d'access erroné" });
  }

  const payload = {
    id,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    entite: user.entite,
  };
  const secretKey = process.env.KEY;
  const options = { expiresIn: 60 * 60 }; // 60 minutes
  const token = Jwt.sign(payload, secretKey, options);
  res.send(token);
}

export async function externalLogin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.externalLogin(email);
  if (!user) {
    return res
      .status(200)
      .json({ error: "Adresse email ou mot de passe erroné" });
  }

  if (!user.status) {
    console.log(user.status);
    return res.status(200).json({ error: "Compte désactivé" });
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    return res
      .status(200)
      .json({ error: "Adresse email ou mot de passe erroné" });
  }

  const payload = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    entite: user.entite,
  };
  const secretKey = process.env.KEY;
  const options = { expiresIn: 60 * 60 }; // 60 minutes
  const token = Jwt.sign(payload, secretKey, options);
  res.send(token);
}