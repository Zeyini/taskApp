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
  //dispatching the array of the user to saga and add 1 to value variable progress
  const handleProgress = (item) => {
    item.progress += 1;
    dispatch({
      type: "UPDATE_PROGRESS",
      payload: item,
    });
    console.log(item.progress);
  };
  const handledelete = (item) => {
    dispatch({
      type: "DELETE NOTE",
      payload: item,
    });
    console.log(item.progress);
  };

  return (
    <div className="container">
      <p></p>
      <h1>You got this </h1>
      {/* render .MAP code below  */}
      <div>
        {/* <h3>{JSON.stringify(activitiesItems)}</h3> */}
        {activitiesItems.map((item) => (
          <div key={item.id}>
            {/* {console.log(JSON.stringify(item))} */}
            <span>
              <br />
              {item.item}
              <br />
            </span>
            <div>
              <div> activity id = {item.activitiesid}</div>
              <div>{item.username}</div>
              <div>{item.activityname}</div>

              <div>{item.date}</div>
              <div>{item.completion_status}</div>
 
              <div>{item.notes}</div>
              <div>Monday Status: {item.monday_status ? 'Completed' : 'Incomplete'}</div>
      <div>Tuesday Status: {item.tuesday_status ? 'Completed' : 'Incomplete'}</div>
      <div>Wednesday Status: {item.wednesday_status ? 'Completed' : 'Incomplete'}</div>
      <div>Thursday Status: {item.thursday_status ? 'Completed' : 'Incomplete'}</div>
      <div>Friday Status: {item.friday_status ? 'Completed' : 'Incomplete'}</div>
      <div>Saturday Status: {item.saturday_status ? 'Completed' : 'Incomplete'}</div>
      <div>Sunday Status: {item.sunday_status ? 'Completed' : 'Incomplete'}
              

              
              <button onClick={() => handledelete(item)}>delete</button>
              </div>
              <div onClick={() => handleProgress(item)}>{item.progress}</div>
            </div>
          </div>

          
        ))}
      </div>
   
    </div>
  );
}

export default InfoPage;
