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
    const insertQuery = `INSERT INTO users {username, email, password, email, city, country, street, pincode} VALUES {$1, $2, $3, $4, $5, $6, $7}`;
    await pgCLient.query(insertQuery, [
      username,
      password,
      email,
      city,
      country,
      street,
      pincode,
    ]);
    res.status(200).json({ message: "You have signed up" });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error while signing up",
    });
  }
});
