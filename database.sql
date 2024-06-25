-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

Delete FROM "user"
Where id = '14';

UPDATE "user"
SET "username" = 'Biftu'
Where id = '21';

CREATE TABLE "activities" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "name" VARCHAR,
    monday_status BOOLEAN DEFAULT false,
    tuesday_status BOOLEAN DEFAULT false,
    wednesday_status BOOLEAN DEFAULT false,
    thursday_status BOOLEAN DEFAULT false,
    friday_status BOOLEAN DEFAULT false,
    saturday_status BOOLEAN DEFAULT false,
    sunday_status BOOLEAN DEFAULT false
);

--SELECT *
--FROM "user"
--JOIN weekly_status ON "user".id = weekly_status.user_id;
----
Drop Table activities;
Drop Table user_activities;

CREATE TABLE "user_activities" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "activities_id" INT REFERENCES "activities" ,
    "date" DATE DEFAULT CURRENT_DATE, 
     "notes" VARCHAR,
     "completion_status" BOOLEAN,
     "progress" INT DEFAULT 0
);


-- Inserting data into the "activities" table
INSERT INTO "activities" ("user_id", "name", "monday_status", "tuesday_status", "wednesday_status", "thursday_status", "friday_status", "saturday_status", "sunday_status") VALUES
    (13, 'draw', true, false, true, false, true, false, true),
    (14, 'read', false, true, false, true, false, true, false);

-- Inserting data into the "user_activities" table
INSERT INTO "user_activities" ("user_id", "actvities_id", "date", "notes", "completion_status", "progress") VALUES
    (14, 1, '2024-05-01', 'will try this tomorrow', true, 50),
    (13, 2, '2024-05-02', 'i am doing bad', false, 30);



INSERT INTO "user_activities" ("user_id", "actvities_id", "date", "notes","completion_status","progress")
VALUES 
(13,2,'2024-05-01 12:00:00', 'sad',false,8);


SELECT user_activities.id,"user".id as userid,"user".username, activities.name AS activityName, user_activities.date, user_activities.notes, user_activities.completion_status,user_activities.progress
FROM "user"
JOIN user_activities ON "user".id = user_activities.user_id
JOIN activities ON user_activities.actvities_id = activities.id;
--WHERE "user".id = 13;


 INSERT INTO "activities" ("user_id", "name")
 VALUES (6, 'swim')
 AND
 INSERT INTO  "user_activities" ("user_id", "actvities_id", "date", "notes","completion_status","progress")
    VALUES (6, "actvities_id", "date",'in the ocean',"completion_status","progress");
    
    
    
    SELECT 
    
    user_activities.id AS id,
    "user".id AS user_id,
    "user".username,
    activities.id AS activity_id,
    activities.name AS activity_name,
    user_activities.id AS user_activity_id,
    user_activities.date AS user_activity_date,
    user_activities.notes,
    user_activities.completion_status,
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
    activities ON user_activities.actvities_id = activities.id
    ORDER BY "user".id;


UPDATE activities
SET monday_status = NOT monday_status
Where  "user_id" = 13 AND activities.id = 2;

DELETE FROM "user_activities"
    WHERE "user_id" = 14 
    AND "actvities_id" = 4;