import jwtPKG from "jsonwebtoken";
const Jwt = jwtPKG;

export function hasValidToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = Jwt.verify(token, process.env.KEY);
    res.locals = { ...res.locals, user: payload };
  } catch (error) {
    return res.status(403).end();
  }
  next();
}

const permissions = {
  respSite: { id: 1 },
  respProd: { id: 2 },
  chefEquipe: { id: 3 },
  technicien: { id: 4 },
};

export function hasPermission(res, permission) {
  const { permissionId } = res.locals.user.role;
  if (permissionId == permissions[permission].id) {
    return true;
  }
  return false;
}

export function isResp(req, res, next) {
  if (!(hasPermission(res, "respSite") || hasPermission(res, "respProd"))) {
    return res.status(403).json({ message: "Permission denied" });
  }
  next();
}

export function isChefEquipe(req, res, next) {
  if (!hasPermission(res, "chefEquipe")) {
    return res.status(403).json({ message: "Permission denied" });
  }
  next();
}

export function isNotResp(req, res, next) {
  if (hasPermission(res, "respSite") || hasPermission(res, "respProd")) {
    return res.status(403).json({ message: "Permission denied" });
  }
  next();
}
