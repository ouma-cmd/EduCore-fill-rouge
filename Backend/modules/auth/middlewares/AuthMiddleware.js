const jwt = require("jsonwebtoken");

function AuthMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: "Token missing" });
  } else {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded;
      next();
    });
  }
}
module.exports = AuthMiddleware;
