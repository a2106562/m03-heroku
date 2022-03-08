const User = require("../model/user.model");
const minPasswordLength = 10;

const createUser = async (username, password) => {
  // Verificar que l'usuari no existeix
  const userExists = await User.findOne({ username: username }).select(
    "username"
  );
  if (userExists) {
    throw new Error("The user already exists");
  }

  // Verificar que la password sigui prou llarga
  if (!password || password.length < minPasswordLength) {
    throw new Error("The password is too short");
  }

  // Crear usuari
  const newUser = new User({ username });
  await newUser.setPassword(password);
  await newUser.save();
  return findUser(username);
};

const findUser = async (username) => {
  // Verificar si l'usuari existeix
  const usuari = await User.findOne({ username: username }).select("username");
  if (usuari) {
    return usuari;
  } else {
    throw new Error("The user doesn't exists");
  }
};

const findAllUsers = async () => {
  // Buscar tots els usuaris
  const dbres = await User.find({}).select("username");
  return dbres;
};

const deleteUser = async (username) => {
  //Verificar que l'usuari existeix
  const userExists = await User.findOne({ username: username }).select(
    "username"
  );
  if (!userExists) {
    throw new Error("The user doesn't exists");
  }

  // Eliminar usuari
  const dbres = await User.findOneAndRemove({ username: username }).select(
    "username"
  );
  return dbres;
};

const findUserById = async (id) => {
  return await User.findById(id);
};

module.exports = {
  createUser,
  findUser,
  findAllUsers,
  deleteUser,
  findUserById,
};
