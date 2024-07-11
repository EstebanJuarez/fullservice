import jwt from "jsonwebtoken";



export const adminAuthMiddleware = (req, res, next) => {
  try {
    const token = req.header("x-auth-token")
    console.log("token este es del backedn " + token)
    if (!token) {
      return res.status(403).send({ error: "Token no otorgado." });
    }
    const decoded = jwt.verify(token, process.env.MI_CLAVE);
    req.user = decoded.user;
    req.user.id = decoded.user.id;
    if (req.user.role !== "admin") {
      return res.status(401).send("Sin suficientes privilegios");
    }
    next();
  } catch (err) {
    return res.status(401).send("Token is not valid.", err);
  }
};
