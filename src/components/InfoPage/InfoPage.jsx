import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {

  useEffect(() => {
    getActivities()
  }, [])

  const dispatch = useDispatch();
  const activitiesItems = useSelector(store => store.activities.activities); 
  console.log('CliENT SIDE ARRAY RECIEVED',activitiesItems)

  // get activites and mount
  const getActivities = () => {
    dispatch({
      type: 'GET_ACTIVITES'
    })
  }

  return (
    <div className="container">
      <p>Info Page</p>
      <p>wohooo</p>
      <h3>{JSON.stringify(activitiesItems)}</h3>
      <div>
        {activitiesItems.map(item => {
          return (
            <>
            <span key={item.id}>{item.description}<br>
            </br> {item.item} <br>
            </br><br/>
            </span>
            <div>
            <div>{item.username}</div>
            <div>{item.activitname}</div>
            <div>{item.date}</div>
            <div>{item.completion_status}</div>
            <div>{item.notes}</div>
            </div>
            


            
            </>
          )
        })}
      </div>

    </div>
  );
}

export default InfoPage;
