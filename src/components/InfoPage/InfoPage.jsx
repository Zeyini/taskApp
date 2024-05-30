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

// dispach the object to saga to upate status
  const toggleStatusM = (item) => {
    dispatch({
      type: 'TOGGLE_STATUS_M',
      payload: item     
    });
  };
  const toggleStatusT = (item) => {
    dispatch({
      type: 'TOGGLE_STATUS_T',
      payload: item     
    });
  };
  const toggleStatusW = (item) => {
    dispatch({
      type: 'TOGGLE_STATUS_W',
      payload: item     
    });
  };
  const toggleStatusTh = (item) => {
    dispatch({
      type: 'TOGGLE_STATUS_TH',
      payload: item     
    });
  };
  const toggleStatusF = (item) => {
    dispatch({
      type: 'TOGGLE_STATUS_F',
      payload: item     
    });
  };
  const toggleStatusSa = (item) => {
    dispatch({
      type: 'TOGGLE_STATUS_S',
      payload: item     
    });
  };
  const changeStatusSu = (item) => {
    dispatch({
      type: 'TOGGLE_STATUS_SU',
      payload: item     
    });
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
              {/* {console.log(JSON.stringify(item))} */}
              <br />
            </span>
            <div>
              <div> activity id = {item.activitiesid}</div>
              <div>{item.username}</div>
              <div>{item.activityname}</div>

              <div>{item.date}</div>
              <div>{item.completion_status}</div>
 
              <div onClick={() => toggleStatusM(item)}> <span>Monday Status: </span>
              {item.monday_status ? 'Incomplete' : 'Completed'}
              </div>
               {/* {console.log(JSON.stringify(item.monday_status ))} */}
      <div onClick={() => toggleStatusT(item)} >Tuesday Status: {item.tuesday_status ? 'Completed' : 'Incomplete'}</div>
      <div onClick={() => toggleStatusW(item)} >Wednesday Status: {item.wednesday_status ? 'Completed' : 'Incomplete'}</div>
      <div onClick={() => toggleStatusTh(item)} >Thursday Status: {item.thursday_status ? 'Completed' : 'Incomplete'}</div>
      <div onClick={() => toggleStatusF(item)} >Friday Status: {item.friday_status ? 'Completed' : 'Incomplete'}</div>
      <div onClick={() => toggleStatusSa(item)} >Saturday Status: {item.saturday_status ? 'Completed' : 'Incomplete'}</div>
      <div onClick={() => changeStatusSu(item)} >Sunday Status: {item.sunday_status ? 'Completed' : 'Incomplete'}
              

      <div>{item.notes}</div>
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
