const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// originally a template router
/**
 * GET route to get actvities from db
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("Received a GET request on /");
  sqlText = `
  SELECT 
    
  user_activities.id,
  "user".id AS userid,
  "user".username,
  activities.id AS activitiesID,
  activities.name AS activityName,
  user_activities.date,
  user_activities.notes,
  user_activities.completion_status,
  user_activities.activities_id,
  user_activities.progress,
  activities.monday_status,
  activities.tuesday_status,
  activities.wednesday_status,
  activities.thursday_status,
  activities.friday_status,
  activities.saturday_status,
  activities.sunday_status
FROM 
  "user"
LEFT JOIN 
  user_activities ON "user".id = user_activities.user_id
LEFT JOIN 
  activities ON user_activities.activities_id = activities.id
  ORDER BY user_activities.id;`;
  pool
    .query(sqlText)
    .then((dbRes) => {
      console.log("GET worked in api/actvitiesRouter", dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log("Error in /api/shelf ", dbErr);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */

router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("req.user: ", req.user);
  console.log("req.body", req.body);

  // Extracting user ID from the request
  const userID = req.user.id;
  console.log("USER ID TO BE SENT TO DB", userID);

  // Extracting activity name from the request
  const activityName = req.body.data.activtiyName;

  console.log("Activity name TO BE SENT TO DB", activityName);

  // Constructing the SQL query to insert into the activities table
  const sqlText = `
    INSERT INTO "activities" ("user_id", "name") 
    VALUES ($1, $2)
    RETURNING id
  `;
  // Executing the SQL query with the user ID and activity name as parameters
  pool
    .query(sqlText, [userID, activityName])

    .then((activityResult) => {
      const activityId = activityResult.rows[0].id; // Get the ID of the inserted activity

      // Log the activity ID for debugging
      console.log("Inserted activity ID:", activityId);
      console.log("WHOLE activity Id ROW[0].id:", activityResult.rows[0].id); // sends back only the id of the row where insert is made in table
      console.log("WHOLE activity Id ROW[0]:", activityResult.rows[0]); // send back an object of row id { id: 29 }
      console.log("WHOLE activity Id ROW:", activityResult.rows); //sends back an array of id row [ { id: 29 } ] in activities table.
      // Check if activityId is null
      if (!activityId) {
        throw new Error("Failed to insert activity. Activity ID is null.");
      }
      // -------------------👇 SECOND QUERY

      const activityNotes = req.body.data.Actvitynotes; // value of note beign sent to db.

      const insertUserActivitiesQuery = `
    INSERT INTO "user_activities" ("user_id", "activities_id", "notes", "date", "completion_status", "progress")
    VALUES ($1, $2, $3, CURRENT_DATE, false, 0)
  `;

      // Executing this second query to insert into the user_activities table after the insert happens activities and we get the row id for where the change happened.
      return pool.query(insertUserActivitiesQuery, [
        userID,
        activityId,
        activityNotes,
      ]);
    })

    .then((dbRes) => {
      console.log("POST worked in /api/actvitiesRouter!");
      res.sendStatus(201); // Send HTTP status code 201 (Created)
    })
    .catch((dbErr) => {
      console.log("Error in /api/actvitiesRouter ", dbErr);
      res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
    });
});

//like button
router.put("/", rejectUnauthenticated, (req, res) => {
  const newprogress = req.body.data.progress;
  console.log("value of the progress", newprogress);
  const userID = req.user.id;
  console.log("value of the USERID", userID);
  const activitesID = req.body.data.activitiesid;
  console.log("value of the ActivitesID", activitesID);

  // if (userID === req.body.data.userid) {
    const sqlQuery = ` UPDATE "user_activities" 
  SET progress = $1
  WHERE user_activities.activities_id = $2;
  `;
    pool
      .query(sqlQuery, [newprogress, activitesID])

      .then((dbRes) => {
        console.log("put worked in /api/actvitiesRouter!");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  // } else {
  //   res.sendStatus(401);
  // } //401 unauthorized
});

//delete route
router.delete("/", rejectUnauthenticated, (req, res) => {
  const objectRecieved = req.body;
  console.log("VALUE of the object", objectRecieved);
  // terminal view:
  // VALUE of the object {
  //   id: 5,
  //   userid: 14,
  //   username: 'kuyu',
  //   activityname: 'sing',
  //   activitiesid: 5,
  //   date: '2024-05-25T05:00:00.000Z',
  //   notes: 'beyonce',
  //   completion_status: false,
  //   progress: 3
  // }
  // value of the USERID 14
  const userID = req.user.id;
  console.log("value of the USERID", userID); // terminal view: value of the USERID 14

  const notes = req.body.notes;
  console.log("VALUE of the data!", notes); // terminal view: VALUE of the data! happy progress
  
  const activitesID = req.body.activitiesid;
  console.log("value of the ActivitesID", activitesID);
  
  if (userID === req.body.userid) {
    const sqlQuery = `UPDATE "user_activities"
    SET "notes" = NULL
    WHERE "user_id" = $1
    AND "activities_id" = $2;`
    pool
      .query(sqlQuery, [userID, activitesID])

      .then((dbRes) => {
        console.log("put worked in /api/actvitiesRouter!");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  } else {
    res.sendStatus(401);
  } //401 unauthorized
});

//delete card route
router.delete("/deletecard", rejectUnauthenticated, (req, res) => {
  const objectRecieved = req.body;
  console.log("VALUE of the object", objectRecieved);
  // terminal view:
  // VALUE of the object {
  //   id: 5,
  //   userid: 14,
  //   username: 'kuyu',
  //   activityname: 'sing',
  //   activitiesid: 5,
  //   date: '2024-05-25T05:00:00.000Z',
  //   notes: 'beyonce',
  //   completion_status: false,
  //   progress: 3
  // }
  // value of the USERID 14
  const userID = req.user.id;
  console.log("value of the USERID", userID); // terminal view: value of the USERID 14

  const notes = req.body.notes;
  console.log("VALUE of the data!", notes); // terminal view: VALUE of the data! happy progress
  
  const activitesID = req.body.activitiesid;
  console.log("value of the ActivitesID", activitesID);
  
  if (userID === req.body.userid) {
    const sqlQuery = ` DELETE FROM "user_activities"
    WHERE "user_id" = $1 
    AND "activities_id" = $2; 
  `

    pool
      .query(sqlQuery, [userID, activitesID])

      .then((dbRes) => {
        console.log("put worked in /api/actvitiesRouter!");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  } else {
    res.sendStatus(401);
  } //401 unauthorized
});

// update status of monday
router.put("/update-status-monday", rejectUnauthenticated, (req, res) => {
  const monday_status = req.body.data.monday_status;
  console.log("value of the Monday STAtus", monday_status);
  const userID = req.user.id;
  console.log("value of the USERID", userID);
  const activitesID = req.body.data.activitiesid;
  console.log("value of the ActivitesID", activitesID);

  console.log('IN THE UPDATE FUCNTION FOR STATUS')

  if (userID === req.body.data.userid) {

     const sqlQuery = `
     UPDATE activities
    SET monday_status = NOT monday_status
    Where  "user_id" = $1 AND activities.id = $2;
    `;
    
    pool
      .query(sqlQuery, [userID, activitesID])

      .then((dbRes) => {
        console.log("Monday status updated successfully");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  } else {
    res.sendStatus(401);
  } //401 unauthorized
});
// update status of tuesday 
router.put("/update-status-tuesday", rejectUnauthenticated, (req, res) => {
  const tuesday_status = req.body.data.tuesday_status;
  const userID = req.user.id;
  const activitesID = req.body.data.activitiesid;

  if (userID === req.body.data.userid) {
    const sqlQuery = `
     UPDATE activities
    SET tuesday_status = NOT tuesday_status
    Where  "user_id" = $1 AND activities.id = $2;
    `;
    pool
      .query(sqlQuery, [userID, activitesID])
      .then((dbRes) => {
        console.log("Monday status updated successfully");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  } else {
    res.sendStatus(401);
  } //401 unauthorized
});
// update status of wednesday 
router.put("/update-status-wednesday", rejectUnauthenticated, (req, res) => {
  const wednesday_status = req.body.data.wednesday_status;
  const userID = req.user.id;
  const activitesID = req.body.data.activitiesid;

  if (userID === req.body.data.userid) {
    const sqlQuery = `
     UPDATE activities
    SET wednesday_status = NOT wednesday_status
    Where  "user_id" = $1 AND activities.id = $2;
    `;
    pool
      .query(sqlQuery, [userID, activitesID])
      .then((dbRes) => {
        console.log("Monday status updated successfully");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  } else {
    res.sendStatus(401);
  } //401 unauthorized
});
// update status of thursday 
router.put("/update-status-thursday", rejectUnauthenticated, (req, res) => {
  const thursday_status = req.body.data.thursday_status;
  const userID = req.user.id;
  const activitesID = req.body.data.activitiesid;

  if (userID === req.body.data.userid) {
    const sqlQuery = `
     UPDATE activities
    SET thursday_status = NOT thursday_status
    Where  "user_id" = $1 AND activities.id = $2;
    `;
    pool
      .query(sqlQuery, [userID, activitesID])
      .then((dbRes) => {
        console.log("Monday status updated successfully");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  } else {
    res.sendStatus(401);
  } //401 unauthorized
});
// update status of friday 
router.put("/update-status-friday", rejectUnauthenticated, (req, res) => {
  const friday_status = req.body.data.friday_status;
  const userID = req.user.id;
  const activitesID = req.body.data.activitiesid;

  if (userID === req.body.data.userid) {
    const sqlQuery = `
     UPDATE activities
    SET friday_status = NOT friday_status
    Where  "user_id" = $1 AND activities.id = $2;
    `;
    pool
      .query(sqlQuery, [userID, activitesID])
      .then((dbRes) => {
        console.log("Monday status updated successfully");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  } else {
    res.sendStatus(401);
  } //401 unauthorized
});
// update status of saturday 
router.put("/update-status-saturday", rejectUnauthenticated, (req, res) => {
  const saturday_status = req.body.data.saturday_status;
  const userID = req.user.id;
  const activitesID = req.body.data.activitiesid;

  if (userID === req.body.data.userid) {
    const sqlQuery = `
     UPDATE activities
    SET saturday_status = NOT saturday_status
    Where  "user_id" = $1 AND activities.id = $2;
    `;
    pool
      .query(sqlQuery, [userID, activitesID])
      .then((dbRes) => {
        console.log("Monday status updated successfully");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  } else {
    res.sendStatus(401);
  } //401 unauthorized
});
// update status of sunday 
router.put("/update-status-sunday", rejectUnauthenticated, (req, res) => {
  const sunday_status = req.body.data.sunday_status;
  const userID = req.user.id;
  const activitesID = req.body.data.activitiesid;

  if (userID === req.body.data.userid) {
    const sqlQuery = `
     UPDATE activities
    SET sunday_status = NOT sunday_status
    Where  "user_id" = $1 AND activities.id = $2;
    `;
    pool
      .query(sqlQuery, [userID, activitesID])
      .then((dbRes) => {
        console.log("Monday status updated successfully");
        res.sendStatus(201); // Send HTTP status code 201 (Created)
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
      });
  } else {
    res.sendStatus(401);
  } //401 unauthorized
});


// delete the whole row
// ` DELETE FROM "user_activities"
//     WHERE "user_id" = $1 -- Specify the user_id for whom you want to delete the comment
//     AND "activities_id" = $2; -- Specify the activities_id for which you want to delete the comment
//   `


// update progress for only tthe user logged in 👇
// router.put("/", rejectUnauthenticated, (req, res) => {
//   const newprogress = req.body.data.progress;
//   console.log("value of the progress", newprogress);
//   const userID = req.user.id;
//   console.log("value of the USERID", userID);
//   const activitesID = req.body.data.activitiesid;
//   console.log("value of the ActivitesID", activitesID);

//   if (userID === req.body.data.userid) {
//     const sqlQuery = ` UPDATE "user_activities" 
//   SET progress = $1
//   WHERE user_activities.user_id = $2 AND user_activities.activities_id = $3;
//   `;
//     pool
//       .query(sqlQuery, [newprogress, userID, activitesID])

//       .then((dbRes) => {
//         console.log("put worked in /api/actvitiesRouter!");
//         res.sendStatus(201); // Send HTTP status code 201 (Created)
//       })
//       .catch((dbErr) => {
//         console.log("Error in PUT /api/actvitiesRouter ", dbErr);
//         res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
//       });
//   } else {
//     res.sendStatus(401);
//   } //401 unauthorized
// });


module.exports = router;
