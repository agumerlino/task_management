const jwt = require("jsonwebtoken");

require("dotenv").config();

// Middleware para verificar el token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  const token = authHeader.split(" ")[1]; // El token debe enviarse como "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Almacenar los datos del usuario en la solicitud
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}

module.exports = verifyToken;