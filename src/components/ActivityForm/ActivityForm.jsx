import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography} from '@mui/material';


function ActivityForm() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // code to make a post 👇- move to be moved to a new Component. use dispatch already imported
  const [Actvitynotes, setActvitynotes] = useState('');
  const [Activityname, setActivityname] = useState('');

  const dispatch = useDispatch(); // use to send dispach to postactivities saga fucntion 

  const history = useHistory();

  const handleAddItem = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_INPUT_POST',
      payload: { Actvitynotes: Actvitynotes, 
                 activtiyName: Activityname }
    })

    history.push('/info');
  }


  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {/* <h2> Submit Activity </h2> */}
      <Typography variant="h7" align="center">Please submit the activity you wish to track, along with any accompanying comments.</Typography>

      {/* <p>Your ID is: {user.id}</p> */}

      {/* to be moved to a form componet  👇*/}
<form onSubmit={handleAddItem}>


<TextField label="Activity Name" variant="standard" style={{ padding: '10px', margin: '24px'}} onChange={(e) => setActivityname(e.target.value)} value={Activityname}>

           {/* <label>

    <input type="text" 
    placeholder="Enter activity name"
           onChange={(e) => setActivityname(e.target.value)}
           value={Activityname}/>
           </label> */}
           </TextField>
           <br></br>

  
<TextField label="Comments" variant="standard" style={{ padding: '10px', margin: '24px'}} onChange={(e) => setActvitynotes(e.target.value)}
           value={Actvitynotes}>

  {/* <label>

    <input type="text" 
     placeholder="Enter activity notes"
           onChange={(e) => setActvitynotes(e.target.value)}
           value={Actvitynotes}/>
           </label> */}

           </TextField>

<br></br>


           
    <Button type="submit" variant="contained" >Submit</Button>
    </form>


    </div>
    
  );
}

// this allows us to use <App /> in index.js
export default ActivityForm;