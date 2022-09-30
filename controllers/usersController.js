import User from "../models/User.js";
import Role from "../models/Role.js";

export async function create(req, res) {
  const reqUser = res.locals.user;
  const data = req.body;
  try {
    const user = new User(data);
    if (!(await hasPermissionToCreate(reqUser, user))) {
      return res
        .status(403)
        .json({ message: "Vous ne pouvez pas faire cette action." });
    }
    await user.save();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const reqUser = res.locals.user;
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const user = new User({ ...data, id });
    if (!(await hasPermissionToUpdate(reqUser, { ...user, id }))) {
      return res
        .status(403)
        .json({ message: "Vous ne pouvez pas faire cette action." });
    }
    await user.update();
    res.status(204).end();
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
  const id = Number(req.params.id);
  try {
    if (!(await hasPermissionToDelete(reqUser, id))) {
      return res
        .status(403)
        .json({ message: "Vous ne pouvez pas faire cette action." });
    }
    await User.delete(id);
    res.status(204).end();
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
    if (
      typeof newUser.status != "undefined" &&
      oldUser.status != newUser.status
    ) {
      return false;
    }
    return true;
  }
  // III) Utilisateur d'une permission inférieure
  if (reqUser.role.permissionId < oldUser.role.permissionId) {
    // B) Role équivalent ou supérieur
    const newUserRole = await Role.findById(newUser.roleId);
    if (newUserRole.permissionId <= reqUser.role.permissionId) {
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
  const newUserRole = await Role.findById(newUser.roleId);
  // II) newUser a une permission supérieure ou équivalente à reqUser
  if (newUserRole.id <= reqUser.role.permissionId) {
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
