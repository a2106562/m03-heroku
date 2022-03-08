const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { findUserById } = require("./user.service");
const logger = require("../log/logger.log");

const login = async (username, password) => {
  // Cercar el user per username
  const usuari = await User.findOne({ username: username });
  // Verificar que el usuari i password és correcte i retornar la resposta
  const isAuthenticated = await usuari?.matchPassword(password);
  return isAuthenticated ? await usuari.generateToken() : null;
};

const verifyToken = async (token) => {
  // Verificar Bearer token i retornar usuari del token
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  return await findUserById(decoded.userId);
};

module.exports = { login, verifyToken };
