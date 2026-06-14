const db = require("../config/db");

// ======================
// GET ALL EMPLOYEES
// ======================
const getEmployees = async (req, res) => {
try {
const result = await db.query("SELECT ep.id, ep.user_id, u.name, u.email, ep.department_id, d.department_name, ep.phone, ep.address, ep.designation FROM employee_profiles ep LEFT JOIN users u ON ep.user_id = u.id LEFT JOIN departments d ON ep.department_id = d.id ORDER BY ep.id");

res.json(result.rows);

} catch (error) {
console.log(error);

res.status(500).json({
  success: false,
  message: "Server Error"
});

}
};

// ======================
// ADD EMPLOYEE
// ======================
const addEmployee = async (req, res) => {
try {

const {
  name,
  email,
  department_id,
  phone,
  address,
  designation
} = req.body;

// Create User
const userResult = await db.query(
  `
  INSERT INTO users
  (
    name,
    email,
    password
  )
  VALUES ($1, $2, $3)
  RETURNING id
  `,
  [name, email, "123456"]
);

const user_id = userResult.rows[0].id;

// Create Employee Profile
const employeeResult = await db.query(
  `
  INSERT INTO employee_profiles
  (
    user_id,
    department_id,
    phone,
    address,
    designation
  )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `,
  [
    user_id,
    department_id,
    phone,
    address,
    designation
  ]
);

res.status(201).json({
  success: true,
  message: "Employee Added Successfully",
  employee: employeeResult.rows[0]
});

}  
catch (error) {
  console.error(error);

  if (error.code === "23505") {
    return res.status(400).json({
      message: "Email already exists"
    });
  }

  res.status(500).json({
    message: "Server Error"
  });
}
};
// ======================
// UPDATE EMPLOYEE
// ======================
const updateEmployee = async (req, res) => {
try {

const { id } = req.params;

const {
  name,
  email,
  department_id,
  phone,
  address,
  designation
} = req.body;

// Find employee
const employee = await db.query(
  `
  SELECT user_id
  FROM employee_profiles
  WHERE id = $1
  `,
  [id]
);

if (employee.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Employee not found"
  });
}

const user_id = employee.rows[0].user_id;

// Update user table
await db.query(
  `
  UPDATE users
  SET
    name = $1,
    email = $2
  WHERE id = $3
  `,
  [name, email, user_id]
);

// Update employee profile
const result = await db.query(
  `
  UPDATE employee_profiles
  SET
    department_id = $1,
    phone = $2,
    address = $3,
    designation = $4
  WHERE id = $5
  RETURNING *
  `,
  [
    department_id,
    phone,
    address,
    designation,
    id
  ]
);

res.json({
  success: true,
  message: "Employee Updated Successfully",
  employee: result.rows[0]
});

} catch (error) {

console.log(error);

res.status(500).json({
  success: false,
  message: error.message
});

}
};

// ======================
// DELETE EMPLOYEE
// ======================
const deleteEmployee = async (req, res) => {
try {

const { id } = req.params;

const employee = await db.query(
  `
  SELECT user_id
  FROM employee_profiles
  WHERE id = $1
  `,
  [id]
);

if (employee.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Employee not found"
  });
}

const user_id = employee.rows[0].user_id;

await db.query(
  `
  DELETE FROM employee_profiles
  WHERE id = $1
  `,
  [id]
);

await db.query(
  `
  DELETE FROM users
  WHERE id = $1
  `,
  [user_id]
);

res.json({
  success: true,
  message: "Employee Deleted Successfully"
});

} catch (error) {

console.log(error);

res.status(500).json({
  success: false,
  message: error.message
});

}
};
// ======================
// TEST DATABASE
// ======================
const testDB = async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");

    res.json({
      success: true,
      message: "Database Connected",
      time: result.rows[0]
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
getEmployees,
addEmployee,
updateEmployee,
deleteEmployee,
testDB
};