import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";

export const Decks = () => {
  const authState = useSelector((state) => state.AuthReducer);
  let history = useHistory();
  const goto = (l) => {
    return history.push(l);
  };
  return (
    <>
      <div style={{ backgroundColor: "#E9D5DA" }}>
        <div className="row" style={{ width: "80%", marginLeft: "10%" }}>
          {authState.decks.map((d) => {
            return (
              <div className="col-4" style={{ padding: "20px" }}>
                <Paper elevation={3} style={{ backgroundColor: "#FCFFE7" }}>
                  <Card variant="outlined">
                    <CardActionArea>
                      <CardContent>
                        <Typography align="center">{d.name}</Typography>
                        <Typography align="center">{d.tag}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Paper>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

