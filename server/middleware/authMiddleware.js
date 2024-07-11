import jwt from "jsonwebtoken";



const authMiddleware = (req, res, next) => {

  try {
    const token = req.header("x-auth-token")
    console.log("token este es del backedn " + token)

    if (!token) {
      return res.status(403).send({ error: "Token no otorgado." });
    }
    const decoded = jwt.verify(token, process.env.MI_CLAVE);
    req.user = decoded.user;
    req.user.id = decoded.user.id;
    next()


  }
  catch (err) {
    if (err.name === 'TokenExpiredError') {
      // El token ha expirado, eliminar el token del almacenamiento local
      console.log("El token ha expirado.");
      res.status(401).send("Token expired.");
      return;

    } else {

      console.log(err);
      res.status(401).send("Token is not valid.");
    }

  }
};

export default authMiddleware