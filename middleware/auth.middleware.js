const { verifyToken } = require("../service/auth.service");
const logger = require("../log/logger.log");

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const user = await verifyToken(token);
    if (!user) {
      logger.warn("Atencio. S'ha rebut un token incorrecte!");
      return res.status(401).send("Invalid token authorization");
    }
  } catch (err) {
    logger.warn("Atencio. S'ha rebut un token incorrecte!");
    return res.status(401).send("Invalid token authorization");
  }

  next();
};

module.exports = middleware;
