import "dotenv/config";
import { Client } from "pg";
import express from "express";

const pgCLient = new Client({
  user: process.env.NEONDB_OWNER,
  password: process.env.NEONDB_PASSWORD,
  port: 5432,
  host: process.env.NEONDB_HOST,
  database: process.env.DATABASE,
  ssl: true,
});

const app = express();

app.use(express.json());

async function connectDB() {
  await pgCLient.connect();
}

connectDB();

app.post("/signup", async (req, res) => {
  const { username, password, email, city, country, street, pincode } =
    req.body;
  try {
    const insertQuery = `INSERT INTO users {username, email, password } VALUES {$1, $2, $3} RETURNING id;`;
    const addressInsertQuery = `INSERT INTO address {city, country, street, pincode, user_id} values {$1, $2, $3, $4, $5};`;
    await pgCLient.query("BEGIN;");
    const user = await pgCLient.query(insertQuery, [username, email, password]);
    const user_id = user.rows[0].id;
    await pgCLient.query(addressInsertQuery, [
      city,
      country,
      street,
      pincode,
      user_id,
    ]);
    await pgCLient.query("COMMIT;");
    res.status(200).json({ message: "You have signed up" });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error while signing up",
    });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT users.id, users.username, users.email, address.city, address.country, address.street, address.pincode FROM users JOIN address ON users.id = address.user_id WHERE users.id = $1;`;
    const info = await pgCLient.query(query, [id]);
    res.status(200).json(info.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error while fetching info",
    });
  }
});
