import jwtPKG from "jsonwebtoken";
const Jwt = jwtPKG;

export function hasValidToken(req, res, next) {
  // const authorization = req.headers.authorization;
  // console.log("authorization", authorization);
  // if (authorization?.split(" ")[0] != "Bearer") {
  //   return res.status(403).end("Authorization is missing");
  // }

  // const token = authorization.split(" ")[1];
  // console.log("token", token);
  // if (!token) {
  //   return res.status(403).end("Token is missing");
  // }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = Jwt.verify(token, process.env.KEY);
    console.log(payload);
  } catch (error) {
    return res.status(403).end();
  }

  next();
}
