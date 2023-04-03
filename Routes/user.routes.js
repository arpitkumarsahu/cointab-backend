const express = require("express");
const UserModel = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authrouter = express.Router();
const dateObj = new Date();

authrouter.post("/signup", (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 6, async function (err, hash) {
    if (err) {
      console.log("Something went wrong try again");
    } else {
      const user = new UserModel({
        email,
        password: hash,
        incorrect_password_count: 0,
        time: 0,
        minutes: 0,
      });
      await user.save();
      res.send("Signup Successful");
    }
  });
});

authrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.send("Invalid Email");
  }
  const hash = user.password;
  const userId = user._id;

  bcrypt.compare(password, hash, async function (err, result) {
    if (
      result &&
      user.incorrect_password_count < 5 &&
      ((user.time == 0 && (user.minutes = 0)) ||
        (user.time - dateObj.getHours() <= 0 &&
          user.minutes - dateObj.getMinutes() <= 0))
    ) {
      const token = jwt.sign({ email, userId }, "secret");
      user.incorrect_password_count = 0;
      user.time = 0;
      user.minutes = 0;
      await user.save();

      return res.send({ msg: "login Success", token: token, user: user });
    } else if (user.incorrect_password_count >= 5) {
      const time = dateObj.getHours();
      const min = dateObj.getMinutes();
      user.time = time;
      user.minutes = min;
      await user.save();

      return res.send({
        msg: "you can try after 24 hours",
      });
    } else {
      user.incorrect_password_count++, await user.save();

      return res.send({
        msg: "LOGIN FAILED incorrect Password",
        "Remaning try": 5 - user.incorrect_password_count,
      });
    }
  });
});

module.exports = authrouter;
