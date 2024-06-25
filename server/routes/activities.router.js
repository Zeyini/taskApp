const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
router.get("/", rejectUnauthenticated, (req, res) => {
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
router.post("/", rejectUnauthenticated, (req, res) => {
  const userID = req.user.id;
  const activityName = req.body.data.activtiyName;
  const sqlText = `
    INSERT INTO "activities" ("user_id", "name") 
    VALUES ($1, $2)
    RETURNING id
  `;
  pool
    .query(sqlText, [userID, activityName])
    .then((activityResult) => {
      const activityId = activityResult.rows[0].id;
      console.log("Inserted activity ID:", activityId);
      console.log("WHOLE activity Id ROW[0].id:", activityResult.rows[0].id);
      console.log("WHOLE activity Id ROW[0]:", activityResult.rows[0]);
      console.log("WHOLE activity Id ROW:", activityResult.rows);
      if (!activityId) {
        throw new Error("Failed to insert activity. Activity ID is null.");
      }
      const activityNotes = req.body.data.Actvitynotes;
      const insertUserActivitiesQuery = `
    INSERT INTO "user_activities" ("user_id", "activities_id", "notes", "date", "completion_status", "progress")
    VALUES ($1, $2, $3, CURRENT_DATE, false, 0)
  `;
      return pool.query(insertUserActivitiesQuery, [
        userID,
        activityId,
        activityNotes,
      ]);
    })
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      res.sendStatus(500);
    });
});

router.put("/", rejectUnauthenticated, (req, res) => {
  const newprogress = req.body.data.progress;
  const userID = req.user.id;
  const activitesID = req.body.data.activitiesid;
  const sqlQuery = ` UPDATE "user_activities" 
  SET progress = $1
  WHERE user_activities.activities_id = $2;
  `;
  pool
    .query(sqlQuery, [newprogress, activitesID])

    .then((dbRes) => {
      console.log("put worked in /api/actvitiesRouter!");
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log("Error in PUT /api/actvitiesRouter ", dbErr);
      res.sendStatus(500);
    });
});

router.delete("/", rejectUnauthenticated, (req, res) => {
  const objectRecieved = req.body;
  const userID = req.user.id;
  const notes = req.body.notes;
  const activitesID = req.body.activitiesid;
  if (userID === req.body.userid) {
    const sqlQuery = `UPDATE "user_activities"
    SET "notes" = NULL
    WHERE "user_id" = $1
    AND "activities_id" = $2;`;
    pool
      .query(sqlQuery, [userID, activitesID])
      .then((dbRes) => {
        console.log("put worked in /api/actvitiesRouter!");
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});
router.delete("/deletecard", rejectUnauthenticated, (req, res) => {
  const objectRecieved = req.body;
  const userID = req.user.id;
  const notes = req.body.notes;
  const activitesID = req.body.activitiesid;
  if (userID === req.body.userid) {
    const sqlQuery = ` DELETE FROM "user_activities"
    WHERE "user_id" = $1 
    AND "activities_id" = $2; 
  `;
    pool
      .query(sqlQuery, [userID, activitesID])
      .then((dbRes) => {
        console.log("put worked in /api/actvitiesRouter!");
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});
router.put("/update-status-monday", rejectUnauthenticated, (req, res) => {
  const monday_status = req.body.data.monday_status;
  const userID = req.user.id;
  const activitesID = req.body.data.activitiesid;
  if (userID === req.body.data.userid) {
    const sqlQuery = `
     UPDATE activities
    SET monday_status = NOT monday_status
    Where  "user_id" = $1 AND activities.id = $2;
    `;
    pool
      .query(sqlQuery, [userID, activitesID])
      .then((dbRes) => {
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});
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
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});
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
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});
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
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});
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
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});
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
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});
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
        res.sendStatus(201);
      })
      .catch((dbErr) => {
        console.log("Error in PUT /api/actvitiesRouter ", dbErr);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
