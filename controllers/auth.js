const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const bcrypt = require("bcrypt");


//build out route here
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});


// post method
router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });

  if (userInDatabase) {
    return res.send("Username already taken.");
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  // validation logic

  const user = await User.create(req.body);
  res.send(`Thanks for signing up ${user.username}`);

});

// post method

router.post("/sign-in", async (req,res) => {
// find the user name
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

// compare plain text password provided by client against the hashed password
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }
/// redirect to whatever
res.send(`you logged in successfully! welcome ${userInDatabase.username}`)

});


module.exports = router;
