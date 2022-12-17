const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to the database
connect();
async function connect() {
  try {
    await pool.connect();
    console.log('Connected to Database');
  } catch (e) {
    console.error(`Connection failed ${e}`);
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};
