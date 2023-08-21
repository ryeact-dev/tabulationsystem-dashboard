const express = require("express");
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const { dateConverter } = require("../util/dateConverter");

const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

const router = express.Router();
router.use(cookieParser());

//  ===== GET ALL USERS =====
router.get("/api/users", async (req, res) => {
  try {
    const allUsersData = await pool.query(
      "SELECT * FROM users ORDER BY judge_number ASC"
    );
    res.json({ allUsers: allUsersData.rows });
  } catch (err) {
    console.error("error fetching users :: ", err);
    return res.status(500).send("Server Error");
  }
});

//  ===== GET CURRENT USERS =====
router.get("/api/users/current", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    try {
      if (err) throw err;
      const { user_id } = userData;

      const currentUser = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [user_id]
      );

      res.json({ currentUser: currentUser.rows[0] });
    } catch (err) {
      console.error("jwt-sign error :: ", err);
      return res.status(500).send("Server Error");
    }
  });
});

//  ===== GET JUDGES =====
router.get("/api/users/judges", async (req, res) => {
  try {
    const judgesData = await pool.query(
      "SELECT * FROM users WHERE role = $1 ORDER BY judge_number ASC",
      ["judge"]
    );
    res.json({ judges: judgesData.rows });
  } catch (err) {
    console.error("error fetching judges :: ", err);
    return res.status(500).send("Server Error");
  }
});

// ==== REGISTER A USER ====
router.post("/api/register-user", async (req, res) => {
  const {
    username,
    fullName,
    password = "UMTC1950",
    judgeNumber = "",
    userRole,
  } = req.body;

  const id = uuidv4();
  const dateAdded = dateConverter();
  const userPassword = bcrypt.hashSync(password, bcryptSalt);

  try {
    //  ILIKE to make the search case-sensitive in
    const userFound = await pool.query(
      "SELECT user_name, full_name FROM users WHERE user_name ILIKE $1 OR full_name ILIKE $2",
      [username, fullName]
    );

    if (userFound.rows.length > 0) {
      const foundUser = userFound.rows[0];

      if (foundUser.user_name.toLowerCase() === username.toLowerCase()) {
        return res.status(409).send("Username already exist.");
      } else if (foundUser.full_name.toLowerCase() === fullName.toLowerCase()) {
        return res.status(409).send("Name already exist.");
      }
    }

    if (userRole === "judge") {
      const judgeNumberExist = await pool.query(
        "SELECT judge_number FROM users WHERE judge_number = $1",
        [judgeNumber]
      );
      if (judgeNumberExist.rows.length > 0)
        return res.status(409).send("Judge Number already exist.");
    }

    await pool.query(
      "INSERT INTO users ( id, user_name, full_name, user_password, judge_number, user_role, date_added ) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, username, fullName, userPassword, judgeNumber, userRole, dateAdded]
    );

    res.json();
    console.log(`${fullName} successfully registered as ${userRole}`);
  } catch (err) {
    console.error("error registering new candidate :: ", err);
    return res.status(500).send("Server Error");
  }
});

// ==== LOGIN USER ====
router.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await pool.query(
      "SELECT * FROM users WHERE user_name = $1",
      [username]
    );

    if (!userData.rows.length)
      return res.status(404).send("Username does not exist!");

    if (userData) {
      const passOk = bcrypt.compareSync(
        password,
        userData.rows[0].user_password
      );
      const user_id = userData.rows[0].id;
      if (passOk) {
        jwt.sign({ user_id }, jwtSecret, {}, (err, token) => {
          try {
            if (err) throw err;
            res.json({ token });
          } catch (err) {
            return res.status(400).send("token error");
          }
        });
      } else {
        return res.status(401).send("Wrong Password!");
      }
    }
  } catch (err) {
    console.error("login error :: ", err);
    return res.status(500).send("Server Error");
  }
});

// ==== DELETE A USER ====
router.delete("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const dateDeleted = dateConverter();
    await pool.query("DELETE FROM users WHERE id = $1;", [userId]);
    res.json({ detail: "User successfully deleted." });
    console.log(`User has been successfully deleted :: ${dateDeleted}`);
  } catch (err) {
    console.error("error while deleting user :: ", err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
