import { Client } from "pg";

const pgCLient = new Client({
  user: "neondb_owner",
  password: "npg_QNIUMO6ms8JZ",
  port: 5432,
  host: "ep-sparkling-sunset-a12q7qcb-pooler.ap-southeast-1.aws.neon.tech",
  database: "neondb",
  ssl: true,
});

async function connectDB() {
  await pgCLient.connect();
  await pgCLient.query("UPDATE users SET username='jiman' WHERE id=1");
  const response = await pgCLient.query("SELECT * FROM users");
  console.log(response.rows);
}

connectDB();
