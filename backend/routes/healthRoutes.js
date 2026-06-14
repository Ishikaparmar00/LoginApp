const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "UP",
    message: "Server Running Successfully"
  });
});

module.exports = router;