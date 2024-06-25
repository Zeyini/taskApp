import React from "react";
import { useSelector } from "react-redux";
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

function Tasklist() {
  const user = useSelector((store) => store.user);
  const activitiesItems = useSelector((store) => store.activities.activities);
  console.log("ACTIVITES HERE", activitiesItems);
  console.log("USER HERE", user);

  return (
    <>
      {activitiesItems.map((item) => {
        if (user.id === item.userid) {
          return (
            <div key={item.id}>
              {item.username}
              <br></br>
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
                      {/* Other information */}
                      <div>{item.completion_status}</div>
                      {/* Status elements */}
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

                      {/* Additional information */}
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
                              label="Comment"
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

              <br></br>
            </div>
          );
        } else {
          return null; 
        }
      })}
    </>
  );
}

export default Tasklist;
