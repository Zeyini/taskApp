import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* registerUser(action) {
  try {
    yield put({ type: "CLEAR_REGISTRATION_ERROR" });
    yield axios.post("/api/user/register", action.payload);
    console.log("We are in the SAGA!", action.payload);

    const { username, password } = action.payload.registerReducer;
    console.log("WE ARE IN the SAGA longin data", username, password);
    yield put({ type: "LOGIN", payload: { username, password } });
    yield put({ type: "SET_TO_LOGIN_MODE" });
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}
function* registrationSaga() {
  yield takeLatest("REGISTER", registerUser);
}
export default registrationSaga;

_________;

const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "images"));
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

router.post("/register", upload.single("photo"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const filePath = req.file.path;

  const username = req.body.registerReducer.username;
  const firstName = req.body.registerReducer.firstName;
  const lastName = req.body.registerReducer.lastName;
  const phoneNumber = req.body.registerReducer.phoneNumber;
  const image = req.body.registerReducer.image;

  const password = encryptLib.encryptPassword(
    req.body.registerReducer.password
  );
  const email = req.body.registerReducer.emailAddress;
  console.log("DATA in the Server!", req.body.registerReducer);

  const queryText = `INSERT INTO "user" (username, first_name, last_name, email, password, phone_number, profile_picture_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
  pool
    .query(queryText, [
      username,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      image,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
