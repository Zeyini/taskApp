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
SELECT "user".username, activities.name AS activitName, user_activities.date, user_activities.notes, user_activities.completion_status
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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
