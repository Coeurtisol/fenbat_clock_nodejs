import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcrypt";

export async function create(req, res) {
  const reqUser = res.locals.user;
  const user = req.body;
  user.roleId = Number(user.roleId);
  user.entiteId = Number(user.entiteId) == 0 ? null : Number(user.entiteId);
  try {
    if (!(await hasPermissionToCreate(reqUser, user))) {
      return res
        .status(403)
        .json({ message: "Vous ne pouvez pas faire cette action." });
    }
    user.password = await bcrypt.hash(user.password, 10);
    user.accessCode = await bcrypt.hash(user.accessCode, 10);
    const newUser = new User(user);
    const data = await newUser.save();
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const reqUser = res.locals.user;
  const id = Number(req.params.id);
  const user = req.body;
  if ("status" in user) {
    user.status = Number(user.status) ? true : false;
  }
  if (user.roleId) {
    user.roleId = Number(user.roleId);
  }
  user.entiteId = Number(user.entiteId) == 0 ? null : Number(user.entiteId);
  if (user.accessCode) {
    user.accessCode = await bcrypt.hash(user.accessCode, 10);
  } else delete user.accessCode;
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  } else delete user.password;
  console.log("user", "(" + new Date().toLocaleTimeString() + ")");
  console.log(user);
  try {
    if (!(await hasPermissionToUpdate(reqUser, { ...user, id }))) {
      return res
        .status(403)
        .json({ message: "Vous ne pouvez pas faire cette action." });
    }
    const data = await User.update(id, user);
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function findOne(req, res) {
  const id = Number(req.params.id);
  try {
    const user = await User.findById(id);
    // console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function findAll(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const reqUser = res.locals.user;
  const id = +req.params.id;
  try {
    if (!(await hasPermissionToDelete(reqUser, id))) {
      return res
        .status(403)
        .json({ message: "Vous ne pouvez pas faire cette action." });
    }
    const data = await User.delete(id);
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

// export async function addAdmin(req, res) {
//   const admin = {
//     firstname: "admin",
//     lastname: "admin",
//     roleId: 1,
//     entiteId: null,
//     accessCode: "1234",
//   };
//   try {
//     admin.accessCode = await bcrypt.hash(admin.accessCode, 10);
//     const newUser = new User(admin);
//     const data = await newUser.save();
//     res.json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).end();
//   }
// }

/**
 * @param { * } reqUser User qui lance la requête
 * @param { * } newUser User à modifier
 * @returns { Promise<boolean> }
 */
export async function hasPermissionToUpdate(reqUser, newUser) {
  const oldUser = await User.findById(newUser.id);
  const roles = await Role.getAll();
  // I) Utilisateur d'une permission supérieure
  if (reqUser.role.permissionId > oldUser.role.permissionId) {
    return false;
  }
  // II) Utilisateur d'une permission équivalente
  if (reqUser.role.permissionId == oldUser.role.permissionId) {
    // A) Id différent
    if (reqUser.id != newUser.id) {
      return false;
    }
    // B) Roles différents (et !A)
    if (newUser.roleId && oldUser.role.id != newUser.roleId) {
      return false;
    }
    // C) Status différents (et !A)
    if (newUser.status && oldUser.status != newUser.status) {
      return false;
    }
    return true;
  }
  // III) Utilisateur d'une permission inférieure
  if (reqUser.role.permissionId < oldUser.role.permissionId) {
    // B) Role équivalent ou supérieur
    let newUserPermissionId = roles.find((r) => r.id == newUser.roleId)
      .permission.id;
    if (newUserPermissionId <= reqUser.role.permissionId) {
      return false;
    }
    return true;
  }
  return true;
}

/**
 * @param { * } reqUser User qui lance la requête
 * @param { * } newUser User à créer
 * @returns { Promise<boolean> }
 */
export async function hasPermissionToCreate(reqUser, newUser) {
  // I) reqUser est respSite (1)
  // TODO : RETIRER MAGIC NUMBER
  if (reqUser.role.permissionId == 1) {
    return true;
  }
  const roles = await Role.getAll();
  // II) newUser a une permission supérieure ou équivalente à reqUser
  let newUserPermissionId = roles.find((r) => r.id == newUser.roleId).permission
    .id;
  if (newUserPermissionId <= reqUser.role.permissionId) {
    return false;
  }
  return true;
}

/**
 * @param { * } reqUser User qui lance la requête
 * @param { number } userId Id du user à supprimer
 * @returns { Promise<boolean> }
 */
export async function hasPermissionToDelete(reqUser, userId) {
  // I) reqUser est respSite (1)
  // TODO : RETIRER MAGIC NUMBER
  if (reqUser.role.permissionId == 1) {
    return true;
  }
  const userToDelete = await User.findById(userId);
  // I) userToDelete a une permission supérieure ou équivalente à reqUser
  if (userToDelete.role.permissionId <= reqUser.role.permissionId) {
    return false;
  }
  return true;
}
