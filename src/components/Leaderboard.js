import React, { useEffect, useState } from "react";
import axios from "../common/AxiosConfig";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const Leaderboard = (props) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const handleClose = () =>{
      props.set(false);
  }
  useEffect(() => {
      console.log(props.open)
    if(props.open)
    axios.get("/leaderboard/"+props.id).then((res)=>{
        setLeaderboard(res.data)
    })
    .catch((err)=>{
        console.log(err);
    })
  });
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <span style={{fontSize:"28px"}}>
          Leaderboard
        </span>{" "}
        <LeaderboardIcon
          style={{ color: "#363062", marginTop: "-14px" }}
          fontSize="large"
        ></LeaderboardIcon>
      </DialogTitle>
      <DialogContent>
        {leaderboard.length === 0 ? (
          <h3>No attempts made for the deck</h3>
        ) : (
          leaderboard.map((l, i) => {
            <Typography variant="h5">
              {i + 1}. {" " + l.name + " " + l.score}
            </Typography>;
          })
        )}
      </DialogContent>
    </Dialog>
  );
};
