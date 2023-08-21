require("dotenv").config();
const PORT = process.env.PORT ?? 4000;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pool = require("./db");

const usersRoute = require("./routes/users");
const candidateRoute = require("./routes/candidates");
const competitionRoute = require("./routes/competitions");
const scoresheetsRoute = require("./routes/scoresheets");

const app = express();
const whitelist = [
  process.env.VERCEL_APP_URL,
  process.env.REACT_CLIENT_URL,
  process.env.VITE_CLIENT_URL,
];

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: 'https://tabulationsystem-dashboard-client.vercel.app',
  })
);

async function getPostgresVersion() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT version()");
    console.log(res.rows[0]);
  } finally {
    client.release();
  }
}

getPostgresVersion();

app.use(usersRoute);
app.use(candidateRoute);
app.use(competitionRoute);
app.use(scoresheetsRoute);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on PORT ${PORT}`)
);
