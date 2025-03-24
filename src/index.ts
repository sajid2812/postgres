import "dotenv/config";
import { Client } from "pg";

const pgCLient = new Client({
  user: process.env.NEONDB_OWNER,
  password: process.env.NEONDB_PASSWORD,
  port: 5432,
  host: process.env.NEONDB_HOST,
  database: process.env.DATABASE,
  ssl: true,
});

async function connectDB() {
  await pgCLient.connect();
  const insertQuery = `INSERT INTO users {username, email, password} VALUES {$1, $2, $3}`;
  const response = await pgCLient.query(insertQuery, [
    "Sajid",
    "sajid@gmail.com",
    "12345",
  ]);
  const users = await pgCLient.query("SELECT * FROM users");
  console.log(users.rows);
}

connectDB();
