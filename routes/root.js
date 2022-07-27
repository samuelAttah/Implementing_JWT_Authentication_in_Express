const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
  // res.sendFile("./views/index.html", { root: __dirname });
});
router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
  //We do not need to define a path to the new-page because its been defined above and we only nee to redirect to it
});

module.exports = router;
