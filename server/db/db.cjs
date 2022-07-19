const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "postgres://yeffpovelubyqy:f0087f27ead4de785cc16d0988f3e69dcd0a9cb9242e32c545bc40c457e94550@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/d8nf6vur5nqblq",
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to the database
connect();
async function connect() {
  try {
    await pool.connect();
    console.log("Connected to Database");
  } catch (e) {
    console.error(`Connection failed ${e}`);
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};
