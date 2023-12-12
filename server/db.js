const Pool = require("pg").Pool;

const pool = new Pool({
  user: "samyashajrawi",
  password: "test123445",
  host: "localhost",
  port: 5432,
  database: "students_db"
});

module.exports = pool;