const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
});

const saltRounds = 10;

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.hash);
};

userSchema.methods.setPassword = async function (password) {
  this.salt = await bcrypt.genSalt(saltRounds);
  this.hash = await bcrypt.hash(password, this.salt);
};

userSchema.methods.generateToken = async function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
