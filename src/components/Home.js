import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";
import deckLogo from "../Decks.png"
import quizHistoryLogo from "../quizHistory.png"
import { useHistory } from "react-router-dom"

export const Home = () => {
    let history = useHistory();
  const authState = useSelector((state) => state.AuthReducer);
  return (
    <>
      <div
        style={{ backgroundColor: "#E9D5DA", overflow: "auto", height: "100%" }}
      >
        <div className="row" style={{ width: "80%", marginLeft: "10%" }}>
          <div className="col-4" style={{ padding: "20px" }}>
            <Paper
              elevation={3}
              style={{ backgroundColor: "#FCFFE7" }}
              onClick={() => {
                history.push("/decks");
              }}
            >
              <Card variant="outlined">
                <CardActionArea>
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "30vh",
                      }}
                    >
                      <img
                        style={{ height: "100%" }}
                        src={deckLogo}
                        alt="Deck Logo"
                      />
                    </div>
                    <Typography
                      variant="h5"
                      align="center"
                      style={{ color: "#363062" }}
                    >
                      Decks
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </div>
          <div className="col-4" style={{ padding: "20px" }}>
            <Paper
              elevation={3}
              style={{ backgroundColor: "#FCFFE7" }}
              onClick={() => {
                history.push("/quizHistory");
              }}
            >
              <Card variant="outlined">
                <CardActionArea>
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "30vh",
                      }}
                    >
                      <img
                        style={{ height: "100%" }}
                        src={quizHistoryLogo}
                        alt="Quiz History Logo"
                      />
                    </div>
                    <Typography
                      variant="h5"
                      align="center"
                      style={{ color: "#363062" }}
                    >
                      Quiz History
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};
