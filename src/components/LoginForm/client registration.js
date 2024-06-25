import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: "CLEAR_REGISTRATION_ERROR" });

    // passes the username and password from the payload to the server
    yield axios.post("/api/user/register", action.payload);
    console.log("We are in the SAGA!", action.payload);

    //     // pullling username and password from this object
    //
    // registerReducer: {
    // username: 'jamal',
    // emailAddress: 'yam',
    // password: '123456',
    // phoneNumber: '47771234',
    // image: '',
    // firstName: 'Jamal',
    // lastName: 'Syed'
    // }
    // const username = req.body.registerReducer.username;
    // const password = req.body.registerReducer.password;

    const { username, password } = action.payload.registerReducer;
    console.log("WE ARE IN the SAGA longin data", username, password);
    // // Only send username and password to the login saga
    // const requestedData = { username, password };

    // automatically log a user in after registration
    yield put({ type: "LOGIN", payload: { username, password } });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
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
 


_________

const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// Multer setup for file upload
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'images')); // Destination folder where files will be stored
  },
  
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage });

// // Route for handling image upload ❌
// router.post('/', upload.single('photo'), (req, res) => {
//   // Multer middleware will add `req.file` containing information about the uploaded file
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   // Logic to handle the uploaded file (e.g., save file path to database)
//   const filePath = req.file.path;
//   res.status(200).json({ message: 'File uploaded successfully', filePath: filePath });
// });




// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', upload.single('photo'), (req, res, next) => {

  // Multer middleware will add `req.file` containing information about the uploaded file
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

   // Logic to handle the uploaded file (e.g., save file path to database)
   const filePath = req.file.path;

  const username = req.body.registerReducer.username;
  const firstName = req.body.registerReducer.firstName;
  const lastName = req.body.registerReducer.lastName;
  const phoneNumber = req.body.registerReducer.phoneNumber;
  const image = req.body.registerReducer.image;

  
  const password = encryptLib.encryptPassword(req.body.registerReducer.password);
  const email = req.body.registerReducer.emailAddress;
  console.log("DATA in the Server!",req.body.registerReducer);

  const queryText = `INSERT INTO "user" (username, first_name, last_name, email, password, phone_number, profile_picture_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
  pool
    .query(queryText, [username, firstName,lastName,email,password,phoneNumber,image])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

module.exports = router;
