import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  useEffect(() => {
    getActivities(); // on mount get data from db!
  }, []);

  const dispatch = useDispatch();
  const activitiesItems = useSelector((store) => store.activities.activities);
  // console.log('CliENT SIDE ARRAY RECIEVED',activitiesItems)

  // calling the get function to run
  const getActivities = () => {
    dispatch({
      type: "GET_ACTIVITES",
    });
  };
  const handleProgress = (item) => {
    item.progress += 1;
    dispatch({
      type: "UPDATE_PROGRESS",
      payload: item,
    });
    console.log(item.progress);
  };

  return (
    <div className="container">
      <p>Info Page</p>
      <h1>You got this </h1>
      {/* render .MAP code below  */}
      <div>
        {/* <h3>{JSON.stringify(activitiesItems)}</h3> */}
        {activitiesItems.map((item) => (
          <div key={item.id}>
            {/* {console.log(JSON.stringify(item.id))} */}
            <span>
              <br />
              {item.item}
              <br />
            </span>
            <div>
              <div> writing id = {item.activitiesid}</div>
              <div>{item.username}</div>
              <div>{item.activityname}</div>

              <div>{item.date}</div>
              <div>{item.completion_status}</div>
              <div>{item.notes}</div>
              <div onClick={() => handleProgress(item)}>{item.progress}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoPage;
