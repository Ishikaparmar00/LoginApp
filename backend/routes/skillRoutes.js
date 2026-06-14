const express = require("express");
const router = express.Router();

const {
  getSkills,
  addSkill,
  deleteSkill
} = require("../controllers/skillController");

router.get("/", getSkills);
router.post("/", addSkill);
router.delete("/:id", deleteSkill);

module.exports = router;