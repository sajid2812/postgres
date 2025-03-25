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
    const insertQuery = `INSERT INTO users {username, email, password } VALUES {$1, $2, $3} RETURNING id`;
    const user = await pgCLient.query(insertQuery, [username, email, password]);
    const user_id = user.rows[0].id;
    const addressInsertQuery = `INSERT INTO address {city, country, street, pincode, user_id} values {$1, $2, $3, $4, $5}`;
    await pgCLient.query(addressInsertQuery, [
      city,
      country,
      street,
      pincode,
      user_id,
    ]);
    res.status(200).json({ message: "You have signed up" });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error while signing up",
    });
  }
});
