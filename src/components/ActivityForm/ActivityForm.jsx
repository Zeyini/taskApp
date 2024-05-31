import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';

function ActivityForm() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // code to make a post 👇- move to be moved to a new Component. use dispatch already imported
  const [Actvitynotes, setActvitynotes] = useState('');
  const [Activityname, setActivityname] = useState('');

  const dispatch = useDispatch(); // use to send dispach to postactivities saga fucntion 
  const handleAddItem = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_INPUT_POST',
      payload: { Actvitynotes: Actvitynotes, 
                 activtiyName: Activityname }
    })
  }


  return (
    <div className="container">
      <h2> Submit Activity </h2>
      {/* <p>Your ID is: {user.id}</p> */}

      {/* to be moved to a form componet  👇*/}
<form onSubmit={handleAddItem}>
  
  <label>
Activity Notes:
    <input type="text" 
     placeholder="Enter activity notes"
           onChange={(e) => setActvitynotes(e.target.value)}
           value={Actvitynotes}/>
           </label>
<br></br>

           <label>
 Activity Name:
    <input type="text" 
    placeholder="Enter activity name"
           onChange={(e) => setActivityname(e.target.value)}
           value={Activityname}/>
           </label>
           <br></br>
    <button type="submit">add item</button>
    </form>
    </div>
    
  );
}

// this allows us to use <App /> in index.js
export default ActivityForm;