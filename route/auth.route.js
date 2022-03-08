const express = require("express");
const logger = require("../log/logger.log");
const expressSanitizer = require("express-sanitizer");
const { login } = require("../service/auth.service");

const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(expressSanitizer());

authRouter.post("/", async (req, res) => {
  logger.info("post auth rebut");
  try {
    // Sanejar user i pass
    const sanitizedUsername = req.sanitize(req.body.username);
    const sanitizedPassword = req.sanitize(req.body.password);

    // Demanar l'autenticació al servei i retornar token o error 403
    const token = await login(sanitizedUsername, sanitizedPassword);
    if (token) {
      return res.send({ token: `Bearer ${token}` });
    } else {
      return res.status(403).send("Invalid username or password");
    }
  } catch (err) {
    logger.error(
      "Error, no s'ha pogut fer login: " + JSON.stringify(err.message)
    );
    return res.status(500).send("Auth failed");
  }
});

module.exports = authRouter;
