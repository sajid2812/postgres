import "dotenv/config";
import { Client } from "pg";

const pgCLient = new Client({
  user: process.env.NEONDB_OWNER,
  password: process.env.NEONDB_PASSWORD,
  port: 5432,
  host: process.env.NEONDB_HOST,
  database: "neondb",
  ssl: true,
});

async function connectDB() {
  await pgCLient.connect();
  const insertQuery = `INSERT INTO users {username, email, password} VALUES {$1, $2, $3}`;
  await pgCLient.query("UPDATE users SET username='jiman' WHERE id=1");
  const response = await pgCLient.query("SELECT * FROM users");
  console.log(response.rows);
}

connectDB();
