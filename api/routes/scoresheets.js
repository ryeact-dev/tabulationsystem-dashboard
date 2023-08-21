const express = require("express");
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const { dateConverter } = require("../util/dateConverter");

const router = express.Router();
router.use(cookieParser());

//  ===== GET SCORESHEETS =====
router.get("/api/scoresheets", async (req, res) => {
  const { comp_number, cand_number, judge_number } = req.query;

  let { finalist } = req.query;
  if (finalist === "undefined") finalist = undefined;

  try {
    let query = "SELECT * FROM scoresheets";
    let params = [];

    if (comp_number || cand_number || judge_number || finalist !== undefined) {
      const filterConditions = [];
      if (judge_number > 0) {
        filterConditions.push("judge_number = $1");
        params.push(judge_number);
      }

      if (comp_number > 0) {
        filterConditions.push("competition_number = $" + (params.length + 1));
        params.push(comp_number);
      }

      if (cand_number > 0) {
        filterConditions.push("candidate_number = $" + (params.length + 1));
        params.push(cand_number);
      }

      if (finalist !== undefined) {
        filterConditions.push("is_finalist = $" + (params.length + 1));
        params.push(finalist);
      }

      const filterString = filterConditions.join(" AND ");

      query += ` WHERE ${filterString}`;
    }

    query += ` ORDER BY candidate_number ASC`;

    const scoresheetsData = await pool.query(query, params);

    res.json(scoresheetsData.rows);
  } catch (err) {
    console.error("error fetching scoresheets data :: ", err);
    return res.status(500).send("Server Error");
  }
});

// ==== ADD NEW SCORES ====
router.post("/api/scoresheets", async (req, res) => {
  const {
    competition_number,
    competition_name,
    scoresheet,
    total_score,
    candidateNumber,
    judgeName = "",
    judgeNumber = 0,
    isFinalist,
  } = req.body;

  const id = uuidv4();

  try {
    await pool.query(
      "INSERT INTO scoresheets (scoresheet_id, competition_number, competition_name, total_score, candidate_number, judge_name, judge_number, is_finalist, scoresheet ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb)",
      [
        id,
        competition_number,
        competition_name,
        total_score,
        candidateNumber,
        judgeName,
        judgeNumber,
        isFinalist,
        JSON.stringify(scoresheet),
      ]
    );

    res.json();
  } catch (err) {
    console.error("error adding a scoresheet :: ", err);
    return res.status(500).send("Server Error");
  }
});

// ==== UPDATE SCORES ====
router.put("/api/scoresheets/:competitionId", async (req, res) => {
  const { competitionId } = req.params;

  const {
    competition_number,
    competition_name,
    scoresheet,
    total_score,
    candidateNumber,
    judgeName = "",
    judgeNumber = 0,
    isFinalist,
  } = req.body;

  try {
    await pool.query(
      "UPDATE scoresheets SET competition_number = $1, competition_name = $2, total_score = $3, candidate_number = $4, judge_name = $5, judge_number = $6, is_finalist = $7, scoresheet = $8::jsonb  WHERE scoresheet_id = $9",
      [
        competition_number,
        competition_name,
        total_score,
        candidateNumber,
        judgeName,
        judgeNumber,
        isFinalist,
        JSON.stringify(scoresheet),
        competitionId,
      ]
    );

    res.json();
  } catch (err) {
    console.error("error adding a scoresheet :: ", err);
    return res.status(500).send("Server Error");
  }
});

// --- DELETE A SCORESHEET ---
router.delete("/api/scoresheets/:candidateNumber", async (req, res) => {
  const { candidateNumber } = req.params;

  try {
    const dateDeleted = dateConverter();
    await pool.query("DELETE FROM scoresheets WHERE candidate_number = $1", [
      candidateNumber,
    ]);
    res.json();
    console.log(
      `Scoresheet of Constestant No.${candidateNumber} successfully deleted :: ${dateDeleted}`
    );
  } catch (err) {
    console.error("error while deleting user :: ", err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
