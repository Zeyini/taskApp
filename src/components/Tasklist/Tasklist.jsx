import React from 'react';
import {useSelector} from 'react-redux';

function Tasklist() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const activitiesItems = useSelector((store) => store.activities.activities);
console.log('ACTIVITES HERE',activitiesItems)
console.log('USER HERE',user)
  return (
    <>
      {activitiesItems.map((item) => {
        if (user.id === item.userid) {
          return (
            <div key={item.id}>
                {item.username}
              <br></br>
              {item.activityname}

              <div onClick={() => toggleStatusM(item)}>
                {" "}
                <span>Monday Status: </span>
                {item.monday_status ? "Incomplete" : "Completed"}
              </div>
              {/* {console.log(JSON.stringify(item.monday_status ))} */}
              <div onClick={() => toggleStatusT(item)}>
                Tuesday Status:{" "}
                {item.tuesday_status ? "Completed" : "Incomplete"}
              </div>
              <div onClick={() => toggleStatusW(item)}>
                Wednesday Status:{" "}
                {item.wednesday_status ? "Completed" : "Incomplete"}
              </div>
              <div onClick={() => toggleStatusTh(item)}>
                Thursday Status:{" "}
                {item.thursday_status ? "Completed" : "Incomplete"}
              </div>
              <div onClick={() => toggleStatusF(item)}>
                Friday Status: {item.friday_status ? "Completed" : "Incomplete"}
              </div>
              <div onClick={() => toggleStatusSa(item)}>
                Saturday Status:{" "}
                {item.saturday_status ? "Completed" : "Incomplete"}
              </div>
              <div onClick={() => changeStatusSu(item)}>
                Sunday Status: {item.sunday_status ? "Completed" : "Incomplete"}
              </div>
              <br></br>
            </div>
          );
        } else {
          return null; // Skip mapping this item
        }
      })}
    </>
  );
}

// this allows us to use <App /> in index.js
export default Tasklist;
