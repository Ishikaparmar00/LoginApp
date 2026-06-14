const pool = require("../config/db");


const getDepartments = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM departments ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


const createDepartment = async (req, res) => {
  try {
    const { department_name } = req.body;

    const result = await pool.query(
      "INSERT INTO departments(department_name) VALUES($1) RETURNING *",
      [department_name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name } = req.body;

    const result = await pool.query(
      "UPDATE departments SET department_name = $1 WHERE id = $2 RETURNING *",
      [department_name, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM departments WHERE id = $1",
      [id]
    );

    res.json({
      message: "Department Deleted Successfully"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
};