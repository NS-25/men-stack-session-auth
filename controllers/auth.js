const express = require("express");
const router = express.Router();

//build out route here
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});


module.exports = router;
