const mongoose = require("mongoose");
const logger = require("./log/logger.log");

require("dotenv").config();

let mongoConnection = null;
let connectionString;

const connectDB = async () => {
  const username = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;
  const port = process.env.MONGODB_PORT;
  const database = process.env.MONGODB_DATABASE;

  if (process.env.ENVIRONMENT == "develop") {
    connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}`;
  } else if (process.env.ENVIRONMENT == "production") {
    connectionString = `mongodb+srv://${username}:${password}@${host}/${database}`;
  }
  await mongoose.connect(connectionString);
};

const getConnection = async () => {
  if (!mongoConnection) {
    mongoConnection = await connectDB();
  }
  return mongoConnection;
};

const disconnectDB = async () => {
  if (mongoConnection) {
    await mongoose.connection.close();
  }
};

module.exports = { getConnection, disconnectDB };
