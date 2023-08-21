require("dotenv").config();
const express = require("express");
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const { dateConverter } = require("../util/dateConverter");
const cloudinary = require("cloudinary").v2;

const router = express.Router();
router.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handleUpload(file) {
  try {
    const res = await cloudinary.uploader.upload(file);
    return res.secure_url;
  } catch (err) {
    console.log(err);
  }
}

//  ===== CANDIDATE DATA TABLE =====
router.get("/api/candidates", async (req, res) => {
  try {
    const candidatesData = await pool.query(
      `SELECT * FROM candidates ORDER BY candidate_number ASC`
    );
    res.json({ candidatesData: candidatesData.rows });
  } catch (err) {
    console.error("error fetching candidates :: ", err);
    return res.status(500).send("Server Error");
  }
});

// ==== REGISTER A CANDIDATE ====
router.post("/api/register-candidate", async (req, res) => {
  const { fullName, course, candidateNumber, isFinalist } = req.body;

  const id = uuidv4();
  const date_added = dateConverter();

  const candidateFoundByName = await pool.query(
    "SELECT * FROM candidates WHERE full_name = $1",
    [fullName]
  );
  if (candidateFoundByName.rows.length > 0)
    return res.status(409).send("Candidate already exist.");
  const candidateFoundByNumber = await pool.query(
    "SELECT * FROM candidates WHERE candidate_number = $1",
    [candidateNumber]
  );
  if (candidateFoundByNumber.rows.length > 0)
    return res.status(409).send("Candidate Number already exist.");
  try {
    const cloudinaryURL = await handleUpload(req.body.photo);

    await pool.query(
      "INSERT INTO candidates (id, candidate_number, full_name, course, photo, date_added, is_finalist ) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        id,
        candidateNumber,
        fullName,
        course,
        cloudinaryURL,
        date_added,
        isFinalist,
      ]
    );
    res.json();
    console.log(`${fullName} successfully registered as a candidate`);
  } catch (err) {
    console.error("error registering new candidate :: ", err);
    return res.status(500).send("Server Error");
  }
});

// ==== UPDATE CANDIDATE'S FINALIST STATUS ===
router.patch("/api/candidates", async (req, res) => {
  const { candidateId, isFinalist } = req.body;

  try {
    const updateCanidates = await pool.query(
      "UPDATE candidates SET is_finalist = $1 WHERE id = $2 RETURNING *",
      [isFinalist, candidateId]
    );

    res.json(updateCanidates.rows);
  } catch (err) {
    console.error("error while deleting user :: ", err);
    return res.status(500).send("Server Error");
  }
});

// --- DELETE A CANDIDATE ---
router.delete("/api/candidates/:candidateId", async (req, res) => {
  const { candidateId } = req.params;

  try {
    const dateDeleted = dateConverter();

    await pool.query("DELETE FROM candidates WHERE id = $1", [candidateId]);
    res.json("Candidate successfully deleted.");
    console.log(`Candidate has been successfully deleted :: ${dateDeleted}`);
  } catch (err) {
    console.error("error while deleting user :: ", err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
