const express = require("express");
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

//  ===== GET COMPETITIONS =====
router.get("/api/competitions", async (req, res) => {
  const { filter } = req.query;
  let query = "";
  let values = [];

  try {
    if (filter) {
      query = "SELECT * FROM competitions WHERE competition_id = $1";
      values = [filter];
    } else {
      query = "SELECT * FROM competitions ORDER BY competition_number ASC";
    }
    const competitionsData = await pool.query(query, values);
    res.json(competitionsData.rows);
  } catch (err) {
    console.error("error fetching competitions :: ", err);
    return res.status(500).send("Server Error");
  }
});

//  ===== GET SPECIFIC COMPETITION =====
router.get("/api/specific-competition/:competitionId", async (req, res) => {
  const { competitionId } = req.params;

  try {
    const competitionData = await pool.query(
      "SELECT * FROM competitions WHERE competition_id = $1",
      [competitionId]
    );
    res.json(competitionData.rows);
  } catch (err) {
    console.error("error fetching competitions :: ", err);
    return res.status(500).send("Server Error");
  }
});

// ==== ADD NEW COMPETITION ====
router.post("/api/competitions", async (req, res) => {
  const {
    competition_number,
    competition_name,
    scoresheet,
    isFinalist = false,
  } = req.body;

  let competitionName = competition_name;
  if (isFinalist) competitionName += " (Finalist)";

  const id = uuidv4();

  try {
    const duplicateCompetitionNumber = await pool.query(
      "SELECT competition_number FROM competitions WHERE competition_number = $1",
      [competition_number]
    );

    if (duplicateCompetitionNumber.rows.length > 0)
      return res.status(409).send("Duplicate Competition Number");

    await pool.query(
      "INSERT INTO competitions ( competition_id, competition_number, competition_name, is_finalist, scoresheet ) VALUES ($1, $2, $3, $4, $5::jsonb)",
      [
        id,
        competition_number,
        competitionName,
        isFinalist,
        JSON.stringify(scoresheet),
      ]
    );

    res.json();
    console.log("New competition successfully added");
  } catch (err) {
    console.error("error registering new candidate :: ", err);
    return res.status(500).send("Server Error");
  }
});

// ==== UPDATE A COMPETITION ====
router.put("/api/competitions", async (req, res) => {
  const {
    competition_id,
    competition_number,
    competition_name,
    scoresheet,
    isFinalist = false,
  } = req.body;

  console.log(isFinalist);

  let competitionName = competition_name;
  if (isFinalist) competitionName += " (Finalist)";

  try {
    const duplicateCompetitionNumber = await pool.query(
      "SELECT * FROM competitions WHERE competition_number = $1",
      [competition_number]
    );

    if (duplicateCompetitionNumber.rows[0].competition_id !== competition_id)
      return res.status(409).send("Duplicate Competition Number");
    
    await pool.query(
      "UPDATE competitions SET competition_number = $1, competition_name = $2, is_finalist = $3, scoresheet = $4 WHERE competition_id = $5",
      [
        competition_number,
        competitionName,
        isFinalist,
        JSON.stringify(scoresheet),
        competition_id,
      ]
    );

    res.json();
    console.log("Competition successfully updated!");
  } catch (err) {
    console.error("error registering new candidate :: ", err);
    return res.status(500).send("Server Error");
  }
});

// --- DELETE A COMPETITION ---
router.delete("/api/competitions/:competitionId", async (req, res) => {
  const { competitionId } = req.params;

  try {
    await pool.query("DELETE FROM competitions WHERE competition_id = $1", [
      competitionId,
    ]);
    res.json();
    console.log(`Competition has been successfully deleted`);
  } catch (err) {
    console.error("error while deleting user :: ", err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
