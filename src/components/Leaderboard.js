import React, { useEffect, useState } from "react";
import axios from "../common/AxiosConfig";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const Leaderboard = (props) => {
  
  const handleClose = () =>{
      props.set(false);
  }

  const [leaderboard,setLeaderboard] = useState([])

  useEffect(()=>{
    setLeaderboard(props.leaderboard)
  },[props.leaderboard])

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <span style={{ fontSize: "28px" }}>Leaderboard</span>{" "}
        <LeaderboardIcon
          style={{ color: "#363062", marginTop: "-14px" }}
          fontSize="large"
        ></LeaderboardIcon>
      </DialogTitle>
      <DialogContent>
        {leaderboard.length === 0 ? (
          <h3>No attempts made for the deck</h3>
        ) : (
          // console.log(leaderboard)
          leaderboard.map((l, i) => {
            return (
              <Typography variant="h5">
                {i + 1}. {" " + l.name + " - " + Math.round(l.avgScore*100)/100}
              </Typography>
            );
          })
        )}
      </DialogContent>
    </Dialog>
  );
};
