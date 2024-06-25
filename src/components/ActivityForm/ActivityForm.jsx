import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

function ActivityForm() {
  const user = useSelector((store) => store.user);
  const [Actvitynotes, setActvitynotes] = useState("");
  const [Activityname, setActivityname] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddItem = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_INPUT_POST",
      payload: { Actvitynotes: Actvitynotes, activtiyName: Activityname },
    });

    history.push("/info");
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h7" align="center">
        Please submit the activity you wish to track, along with any
        accompanying comments.
      </Typography>

      <form onSubmit={handleAddItem}>
        <TextField
          label="Activity Name"
          variant="standard"
          style={{ padding: "10px", margin: "24px" }}
          onChange={(e) => setActivityname(e.target.value)}
          value={Activityname}
        ></TextField>
        <br></br>

        <TextField
          label="Comments"
          variant="standard"
          style={{ padding: "10px", margin: "24px" }}
          onChange={(e) => setActvitynotes(e.target.value)}
          value={Actvitynotes}
        ></TextField>
        <br></br>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ActivityForm;
