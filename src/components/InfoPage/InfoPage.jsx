import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  Container,
  Badge,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import { yellow } from "@mui/material/colors";

function InfoPage() {
  useEffect(() => {
    getActivities();
  }, []);

  const dispatch = useDispatch();
  const activitiesItems = useSelector((store) => store.activities.activities);

  const getActivities = () => {
    dispatch({
      type: "GET_ACTIVITES",
    });
  };
  const handleProgress = (item) => {
    item.progress += 1;

    console.log("here is the progress", item.progress);
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

  const deleteCard = (item) => {
    dispatch({
      type: "DELETE CARD",
      payload: item,
    });
    console.log(item.progress);
  };

  const toggleStatusM = (item) => {
    console.log("CURRENT STATUS", item.monday_status);
    dispatch({
      type: "TOGGLE_STATUS_M",
      payload: item,
    });
  };
  const toggleStatusT = (item) => {
    dispatch({
      type: "TOGGLE_STATUS_T",
      payload: item,
    });
  };
  const toggleStatusW = (item) => {
    dispatch({
      type: "TOGGLE_STATUS_W",
      payload: item,
    });
  };
  const toggleStatusTh = (item) => {
    dispatch({
      type: "TOGGLE_STATUS_TH",
      payload: item,
    });
  };
  const toggleStatusF = (item) => {
    dispatch({
      type: "TOGGLE_STATUS_F",
      payload: item,
    });
  };
  const toggleStatusSa = (item) => {
    dispatch({
      type: "TOGGLE_STATUS_S",
      payload: item,
    });
  };
  const changeStatusSu = (item) => {
    dispatch({
      type: "TOGGLE_STATUS_SU",
      payload: item,
    });
  };
  const history = useHistory();
  const goToform = () => {
    history.push("/activityform");
  };

  return (
    <>
      <div>
        <div>
          {activitiesItems.map((item) => (
            <div key={item.id}>
              <span>
                <br />
                {item.item}
                <br />
              </span>
              <Container>
                <Grid container spacing={3} style={{ marginLeft: "-.4cm" }}>
                  <Card>
                    <Box position="relative">
                      <Box position="absolute" top={0} right={0} zIndex={999}>
                        <IconButton onClick={() => deleteCard(item)}>
                          <DeleteOutlined />
                        </IconButton>
                        <Fab
                          size="small"
                          color="gray"
                          aria-label="add"
                          onClick={() => goToform()}
                        >
                          <AddIcon />
                        </Fab>
                      </Box>
                    </Box>
                    <CardHeader
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                        backgroundColor: "floralwhite",
                      }}
                      title={item.username}
                      subheader={item.activityname}
                    />
                    <CardContent>
                      <div>{item.completion_status}</div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div onClick={() => toggleStatusM(item)}>
                          {" "}
                          <div
                            style={{ marginRight: "16px", fontSize: "25px" }}
                          >
                            {" "}
                            <Box boxShadow={1}>Mon</Box>{" "}
                          </div>{" "}
                          <div style={{ margin: "8px" }}>
                            {" "}
                            {item.monday_status ? "✅" : ""}{" "}
                          </div>{" "}
                        </div>
                        <div onClick={() => toggleStatusT(item)}>
                          {" "}
                          <div
                            style={{ marginRight: "16px", fontSize: "25px" }}
                          >
                            {" "}
                            <Box boxShadow={1}>Tue</Box>
                          </div>{" "}
                          <div style={{ margin: "8px" }}>
                            {" "}
                            {item.tuesday_status ? "✅" : ""}{" "}
                          </div>
                        </div>
                        <div onClick={() => toggleStatusW(item)}>
                          {" "}
                          <div
                            style={{ marginRight: "16px", fontSize: "25px" }}
                          >
                            <Box boxShadow={1}>Wed</Box>
                          </div>{" "}
                          <div style={{ margin: "8px" }}>
                            {item.wednesday_status ? "✅" : ""}{" "}
                          </div>
                        </div>
                        <div onClick={() => toggleStatusTh(item)}>
                          {" "}
                          <div
                            style={{ marginRight: "16px", fontSize: "25px" }}
                          >
                            {" "}
                            <Box boxShadow={1}>Thu</Box>
                          </div>{" "}
                          <div style={{ margin: "8px" }}>
                            {item.thursday_status ? "✅" : ""}{" "}
                          </div>
                        </div>
                        <div onClick={() => toggleStatusF(item)}>
                          {" "}
                          <div
                            style={{ marginRight: "16px", fontSize: "25px" }}
                          >
                            {" "}
                            <Box boxShadow={1}>Fri</Box>
                          </div>{" "}
                          <div style={{ margin: "8px" }}>
                            {item.friday_status ? "✅" : ""}{" "}
                          </div>
                        </div>
                        <div onClick={() => toggleStatusSa(item)}>
                          {" "}
                          <div
                            style={{ marginRight: "16px", fontSize: "25px" }}
                          >
                            {" "}
                            <Box boxShadow={1}>Sat</Box>
                          </div>{" "}
                          <div style={{ margin: "8px" }}>
                            {item.saturday_status ? "✅" : ""}{" "}
                          </div>{" "}
                        </div>
                        <div onClick={() => changeStatusSu(item)}>
                          {" "}
                          <div
                            style={{ marginRight: "16px", fontSize: "25px" }}
                          >
                            {" "}
                            <Box boxShadow={1}>Sun</Box>
                          </div>{" "}
                          <div style={{ margin: "8px" }}>
                            {item.sunday_status ? "✅" : ""}{" "}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box mt={2} mb={2} boxShadow={0}>
                          <Typography variant="h7">
                            <TextField
                              id="standard-basic"
                              label="Comments"
                              variant="standard"
                            />
                            <div> {item.notes}</div>
                          </Typography>
                        </Box>
                        <button onClick={() => handledelete(item)}>
                          Delete
                        </button>
                      </div>

                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                      >
                        <IconButton
                          onClick={() => handleProgress(item)}
                          color="primary"
                          aria-label="like"
                        >
                          <Badge badgeContent={item.progress} color="secondary">
                            <FavoriteIcon />
                          </Badge>
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Container>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InfoPage;
