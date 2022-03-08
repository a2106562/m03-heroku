const express = require("express");
const logger = require("./log/logger.log");
const { getConnection, disconnectDB } = require("./dbConnection");
const app = express();
const port = process.env.APP_PORT;

const userRouter = require("./route/user.route");
const authRouter = require("./route/auth.route");
const authMiddleware = require("./middleware/auth.middleware");

app.use("/user", authMiddleware, userRouter);
app.use("/auth", authRouter);

const server = app.listen(port, async () => {
  await getConnection();
  logger.info(`App listening at http://localhost:${port}`);
});

process.on("SIGINT", function () {
  disconnectDB().then(() => {
    server.close(function () {
      logger.info("Database connection closed, clossing application");
      process.exit(0);
    });
  });
});
