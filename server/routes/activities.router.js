const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// originally a template router
/**
 * GET route to get actvities from db
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('Received a GET request on /');
  sqlText = `
  SELECT user_activities.id,"user".id as userid,"user".username, activities.name AS activityName, user_activities.date, user_activities.notes, user_activities.completion_status,user_activities.progress
  FROM "user"
  JOIN user_activities ON "user".id = user_activities.user_id
  JOIN activities ON user_activities.actvities_id = activities.id;
  `;
  pool.query(sqlText)
  .then(dbRes => {
    console.log('GET worked in api/actvitiesRouter', dbRes.rows);
    res.send(dbRes.rows);
  })
  .catch(dbErr => {
    console.log('Error in /api/shelf ', dbErr);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user: ', req.user);
  console.log('req.body', req.body);

  // Extracting user ID from the request
  const userID = req.user.id;
  console.log('USER ID TO BE SENT TO DB', userID);

  // Extracting activity name from the request
  const activityName = req.body.data.activtiyName;
  
  console.log('Activity name TO BE SENT TO DB', activityName);

  // Constructing the SQL query to insert into the activities table
  const sqlText = `
    INSERT INTO "activities" ("user_id", "name") 
    VALUES ($1, $2)
    RETURNING id
  `;
  // Executing the SQL query with the user ID and activity name as parameters
  pool.query(sqlText, [userID, activityName])

  .then(activityResult => {
    const activityId = activityResult.rows[0].id; // Get the ID of the inserted activity

    // Log the activity ID for debugging
    console.log('Inserted activity ID:', activityId);
    console.log('WHOLE activity Id ROW[0].id:', activityResult.rows[0].id); // sends back only the id of the row where insert is made in table
    console.log('WHOLE activity Id ROW[0]:', activityResult.rows[0]); // send back an object of row id { id: 29 }
    console.log('WHOLE activity Id ROW:', activityResult.rows); //sends back an array of id row [ { id: 29 } ] in activities table.
    // Check if activityId is null
    if (!activityId) {
      throw new Error('Failed to insert activity. Activity ID is null.');
    }
// -------------------👇 SECOND QUERY

const activityNotes = req.body.data.Actvitynotes; // value of note beign sent to db. 

    const insertUserActivitiesQuery = `
    INSERT INTO "user_activities" ("user_id", "actvities_id", "notes", "date", "completion_status", "progress")
    VALUES ($1, $2, $3, CURRENT_DATE, false, 0)
  `;

     // Executing this second query to insert into the user_activities table after the insert happens activities and we get the row id for where the change happened. 
     return pool.query(insertUserActivitiesQuery, [userID, activityId, activityNotes]);
  })

    .then(dbRes => {
      console.log('POST worked in /api/shelf!');
      res.sendStatus(201); // Send HTTP status code 201 (Created)
    })
    .catch(dbErr => {
      console.log('Error in /api/shelf ', dbErr);
      res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error)
    });
});

module.exports = router;
