const express = require("express");
const logger = require("../log/logger.log");
const expressSanitizer = require("express-sanitizer");
const userService = require("../service/user.service");

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(expressSanitizer());

userRouter.post("/", async (req, res) => {
  logger.info("post user rebut");
  try {
    // Sanejar user i pass
    const sanitizedUsername = req.sanitize(req.body.username);
    const sanitizedPassword = req.sanitize(req.body.password);
    // Crear usuari nou des del servei
    const newUser = await userService.createUser(
      sanitizedUsername,
      sanitizedPassword
    );
    logger.info(newUser);
    return res.send(newUser);
  } catch (err) {
    logger.error(
      "Error, no s'ha pogut crear l'usuari: " + JSON.stringify(err.message)
    );
    return res.status(500).send("Unable to create user");
  }
});

userRouter.get("/", async (req, res) => {
  logger.info("get user rebut");
  try {
    // Sanejar user
    const sanitizedUsername = req.sanitize(req.body.username);
    // Fer query del user al servei
    const dbres = await userService.findUser(sanitizedUsername);
    logger.info(dbres);
    return res.send(dbres);
  } catch (err) {
    logger.error(
      "Error, no s'ha pogut recuperar l'usuari: " + JSON.stringify(err.message)
    );
    return res.status(500).send("Unable to query user");
  }
});

userRouter.get("/all", async (req, res) => {
  logger.info("get users rebut");
  try {
    // Fer query dels users al servei
    const dbres = await userService.findAllUsers();
    logger.info(dbres);
    return res.send(dbres);
  } catch (err) {
    logger.error(
      "Error, no s'ha pogut recuperar els usuaris: " +
        JSON.stringify(err.message)
    );
    return res.status(500).send("Unable to query users");
  }
});

userRouter.delete("/", async (req, res) => {
  logger.info("delete user rebut");
  try {
    // Sanejar user
    const sanitizedUsername = req.sanitize(req.body.username);
    // Fer delete de l'user al servei
    const dbres = await userService.deleteUser(sanitizedUsername);
    logger.info(dbres);
    return res.send(dbres);
  } catch (err) {
    logger.error(
      "Error, no s'ha pogut eliminar l'usuari: " + JSON.stringify(err.message)
    );
    return res.status(500).send("Unable to delete user");
  }
});

module.exports = userRouter;
