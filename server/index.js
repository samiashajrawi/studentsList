const express = require('express')
const cors = require('cors')
const pool = require("./db");
const app = express()

//Middelware
app.use(cors())
app.use(express.json())



//create a student

app.post("/students", async (req, res) => {
    try {
      const { first_name, last_name, email, major } = req.body;
      const student = await pool.query("SELECT * FROM students WHERE email = $1", [
      email
    ]);
      let newStudent 
      if (student.rowCount) {
        newStudent = await pool.query(
          "update students SET first_name = $1, last_name = $2, check_in_time = $3, check_in_count = $4  where email = $5 RETURNING *",
          [first_name, last_name, new Date(new Date().toISOString()), student.rows[0].check_in_count + 1, student.rows[0].email]
        );
      } else {
        newStudent = await pool.query(
          "INSERT INTO students (first_name, last_name, check_in_time, majors, email) VALUES($1, $2, $3, $4, $5) RETURNING *",
          [first_name, last_name, new Date(new Date().toISOString()), major, email]
        );

      }


    const students = await pool.query("SELECT * FROM students Order by check_in_time DESC");

    res.json(students.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get students

app.get("/index", async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM students Order by check_in_time DESC");

    res.json(students.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a student

app.get("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const students = await pool.query("SELECT * FROM students WHERE student_id = $1", [
      id
    ]);

    res.json(students.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


app.listen(8000, () => {
    console.log("server runing on port 8000")
})

