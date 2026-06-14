const pool = require("../config/db");

// Get Skills
const getSkills = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM skills ORDER BY id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
};

// Add Skill
const addSkill = async (req, res) => {
  try {
    const { skill_name } = req.body;

    const result = await pool.query(
      "INSERT INTO skills (skill_name) VALUES ($1) RETURNING *",
      [skill_name]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

// Delete Skill
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM skills WHERE id=$1",
      [id]
    );

    res.json({ message: "Skill deleted" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getSkills,
  addSkill,
  deleteSkill
};