import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Button from "@mui/material/Button";
import { notifySuccess, notifyError } from "../actionCreators/NotifyActions";
import axios from "../common/AxiosConfig";
import { useDispatch } from "react-redux";
import { userLoad } from "../services/AuthServices";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slide from "@mui/material/Slide";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Leaderboard } from "./Leaderboard";



const readTime = 15;
const ansTime = 10;
const reviewTime = 2;

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
    </div>
  );
};
const getTimeSeconds = (aTime, time) => (aTime - time) | 0;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FriendDeck = () => {
  let history = useHistory();
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [readOpen, setReadOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [readQuizOpen, setReadQuizOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState("");
  const [review, setReview] = useState(false);
  const [responses, setResponses] = useState([]);
  const [currentDeckId, setCurrentDeckId] = useState(-1);

  let {id} = useParams();

  const handleCloseRead = () => {
    setReadOpen(false);
    setReview(false);
    setCorrect("");
  };
  const handleCloseQuiz = () => {
    setQuizOpen(false);
    setReview(false);
    setCorrect("");
  };
  const handleCloseReadQuiz = () => {
    setReadQuizOpen(false);
    setReview(false);
    setCorrect("");
  };
  const handleCloseResult = () => {
    setResultOpen(false);
    setReview(false);
    setCorrect("");
    setScore(0);
    setResponses([]);
  };

  const checkAndAddResponse = () => {
    let cor =
      authState.friends[id].decks[currentDeckId].cards[
        currentCardId
      ].answer.toUpperCase() === answer.toUpperCase();
    if (cor) setScore(score + 1);
    setResponses([
      ...responses,
      {
        cardId:
          authState.friends[id].decks[currentDeckId].cards[currentCardId]._id,
        answer: answer,
        correct: cor,
      },
    ]);
    cor ? setCorrect("Correct") : setCorrect("Wrong");
  };

  const submit = () => {
    console.log({
      deckId: authState.friends[id].decks[currentDeckId]._id,
      score: score,
      responses: responses,
    });
    axios
      .post("/quiz/addQuiz", {
        deckId: authState.friends[id].decks[currentDeckId]._id,
        score: score,
        responses: responses,
      })
      .then((res) => {
        console.log(res);
        dispatch(notifySuccess("Quiz Recorded Successfully"));
        dispatch(userLoad());
      })
      .catch((err) => {
        dispatch(notifyError(err.response.data.errors[0].msg));
      });
  };
  return (
    <>
      <div style={{ backgroundColor: "#E9D5DA" }}>
        <Button onClick={() => history.push("/home")} style={{ float: "left" }}>
          <ArrowBackIcon style={{ color: "#362062", fontSize: "8vh" }} />
        </Button>
        <div className="row" style={{ width: "80%", marginLeft: "10%" }}>
          {authState.friends[id] &&
            (authState.friends[id].decks.length === 0 ? (
              <h3>No decks</h3>
            ) : (
              authState.friends[id].decks.map((d, ind) => {
                return (
                  <div
                    className="col-4"
                    key={d._id}
                    style={{ padding: "20px" }}
                  >
                    <Paper elevation={3} style={{ backgroundColor: "#FCFFE7" }}>
                      <Card variant="outlined">
                        <CardContent
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            height: "30vh",
                            padding: "2px 5px",
                          }}
                        >
                          <div
                            style={{
                              color: "#363062",
                              display: "flex",
                              width: "100%",
                              cursor: "pointer",
                            }}
                          >
                            <LeaderboardIcon
                              fontSize="small"
                              onClick={() => {
                                setCurrentDeckId(ind);
                                setLeaderboardOpen(true);
                              }}
                            />
                          </div>
                          <Typography variant="h4" align="center">
                            {d.name}
                          </Typography>
                          <Typography align="center">
                            {d.tags.map((t) => {
                              return (
                                <span>
                                  <LocalOfferIcon
                                    style={{ color: "#363062" }}
                                  />
                                  {" " + t + " "}
                                </span>
                              );
                            })}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                padding: "5px",
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Button
                                variant="contained"
                                style={{ backgroundColor: "#673ab7" }}
                                size="small"
                                onClick={() => {
                                  setReadOpen(true);
                                  setCurrentDeckId(ind);
                                  setCurrentCardId(0);
                                }}
                              >
                                Read
                              </Button>
                              <Button
                                variant="contained"
                                style={{ backgroundColor: "#673ab7" }}
                                size="small"
                                onClick={(e) => {
                                  setReadQuizOpen(true);
                                  setCurrentDeckId(ind);
                                  setCurrentCardId(0);
                                  e.currentTarget.blur();
                                }}
                              >
                                Read & Quiz
                              </Button>
                              <Button
                                size="small"
                                style={{ backgroundColor: "#673ab7" }}
                                variant="contained"
                                onClick={(e) => {
                                  setQuizOpen(true);
                                  setCurrentDeckId(ind);
                                  setCurrentCardId(0);
                                  e.currentTarget.blur();
                                }}
                              >
                                Quiz
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Paper>
                  </div>
                );
              })
            ))}
        </div>
      </div>
      {/* Read without Timer */}
      {currentDeckId !== -1 && currentCardId !== -1 && (
        <Dialog
          open={readOpen}
          TransitionComponent={Transition}
          onClose={handleCloseRead}
          style={{
            color: "#FCFFE7",
          }}
          fullWidth
          maxWidth="md"
        >
          <div
            className="row"
            style={{ alignItems: "center", backgroundColor: "#f2e6c4" }}
          >
            {authState.friends[id].decks[currentDeckId].cards.length === 0 ? (
              <>
                <Typography variant="h2">No cards in this Deck</Typography>
              </>
            ) : (
              <>
                <div
                  className="col-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (currentCardId > 0) setCurrentCardId(currentCardId - 1);
                  }}
                >
                  {currentCardId !== 0 && (
                    <ChevronLeftIcon
                      style={{ fontSize: "4em" }}
                    ></ChevronLeftIcon>
                  )}
                </div>
                <div className="col-10">
                  <DialogContent
                    style={{
                      height: "50vh",
                      maxHeight: "80vh",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h5">
                        {
                          authState.friends[id].decks[currentDeckId].cards[
                            currentCardId
                          ].content
                        }
                      </Typography>
                    </div>
                  </DialogContent>
                </div>
                <div
                  className="col-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (
                      currentCardId <
                      authState.friends[id].decks[currentDeckId].cards.length -
                        1
                    )
                      setCurrentCardId(currentCardId + 1);
                  }}
                >
                  {currentCardId !==
                    authState.friends[id].decks[currentDeckId].cards.length -
                      1 && (
                    <ChevronRightIcon
                      style={{ fontSize: "4em" }}
                    ></ChevronRightIcon>
                  )}
                </div>
              </>
            )}
          </div>
        </Dialog>
      )}
      {/* Read with Timer */}
      {currentDeckId !== -1 && currentCardId !== -1 && (
        <Dialog
          open={readQuizOpen}
          TransitionComponent={Transition}
          onClose={handleCloseReadQuiz}
          style={{
            color: "#FCFFE7",
          }}
          fullWidth
          maxWidth="md"
        >
          <div style={{ backgroundColor: "#f2e6c4" }}>
            {authState.friends[id].decks[currentDeckId].cards.length === 0 ? (
              <>
                <Typography variant="h2">No cards in this Deck</Typography>
              </>
            ) : (
              <>
                <div className="row" style={{ paddingTop: "10px" }}>
                  <div
                    className="col-11"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography variant="h8" style={{ paddingRight: "4px" }}>
                      Time Remaining{" "}
                    </Typography>
                  </div>
                  <CountdownCircleTimer
                    isPlaying={true}
                    size={40}
                    key={currentCardId}
                    strokeWidth={4}
                    colors="#7E2E84"
                    duration={readTime}
                    initialRemainingTime={readTime}
                    onComplete={(totalElapsedTime) => {
                      if (
                        currentCardId <
                        authState.friends[id].decks[currentDeckId].cards
                          .length -
                          1
                      )
                        setCurrentCardId(currentCardId + 1);
                      else {
                        setReadQuizOpen(false);
                        setCurrentCardId(0);
                        setQuizOpen(true);
                      }
                      return {
                        shouldRepeat: readTime - totalElapsedTime === 0,
                      };
                    }}
                  >
                    {({ elapsedTime, color }) => (
                      <span style={{ color }}>
                        {renderTime(
                          "seconds",
                          getTimeSeconds(readTime, elapsedTime)
                        )}
                      </span>
                    )}
                  </CountdownCircleTimer>
                </div>
                <div className="row" style={{ alignItems: "center" }}>
                  <div className="col-1"></div>
                  <div className="col-10">
                    <DialogContent
                      style={{
                        height: "50vh",
                        maxHeight: "80vh",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h5">
                          {
                            authState.friends[id].decks[currentDeckId].cards[
                              currentCardId
                            ].content
                          }
                        </Typography>
                      </div>
                    </DialogContent>
                  </div>
                  <div
                    className="col-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (
                        currentCardId <
                        authState.friends[id].decks[currentDeckId].cards
                          .length -
                          1
                      )
                        setCurrentCardId(currentCardId + 1);
                      else {
                        setReadQuizOpen(false);
                        setCurrentCardId(0);
                        setQuizOpen(true);
                      }
                    }}
                  >
                    <ChevronRightIcon
                      style={{ fontSize: "4em" }}
                    ></ChevronRightIcon>
                  </div>
                </div>
              </>
            )}
          </div>
        </Dialog>
      )}
      {currentDeckId !== -1 && currentCardId !== -1 && (
        <Dialog
          open={quizOpen}
          TransitionComponent={Transition}
          onClose={handleCloseQuiz}
          fullWidth
          maxWidth="md"
          style={{
            color: "#FCFFE7",
          }}
        >
          <div
            style={
              correct === "Correct"
                ? {
                    paddingTop: "10px",
                    backgroundColor: "#19a825",
                  }
                : correct === "Wrong"
                ? {
                    backgroundColor: "#b81828",
                    paddingTop: "10px",
                  }
                : { backgroundColor: "#f2e6c4", paddingTop: "10px" }
            }
          >
            {authState.friends[id].decks[currentDeckId].cards.length === 0 ? (
              <>
                <Typography variant="h2">No cards in this Deck</Typography>
              </>
            ) : (
              <>
                <div className="row">
                  <div
                    className="col-11"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography variant="h8" style={{ paddingRight: "4px" }}>
                      {review
                        ? currentCardId ===
                          authState.friends[id].decks[currentDeckId].cards
                            .length -
                            1
                          ? "Final Results In"
                          : "Next Question In"
                        : "Time Remaining"}
                    </Typography>
                  </div>
                  <CountdownCircleTimer
                    isPlaying={true}
                    size={40}
                    key={currentCardId + review.toString()}
                    strokeWidth={4}
                    colors="#7E2E84"
                    duration={review ? reviewTime : ansTime}
                    initialRemainingTime={review ? reviewTime : ansTime}
                    onComplete={(totalElapsedTime) => {
                      if (review) {
                        setReview(false);
                        setCorrect("");
                        setAnswer("");
                        if (
                          currentCardId <
                          authState.friends[id].decks[currentDeckId].cards
                            .length -
                            1
                        )
                          setCurrentCardId(currentCardId + 1);
                        else {
                          setQuizOpen(false);
                          setResultOpen(true);
                          submit();
                        }
                      } else {
                        checkAndAddResponse();
                        setReview(true);
                      }
                    }}
                  >
                    {({ elapsedTime, color }) => (
                      <span style={{ color }}>
                        {renderTime(
                          "seconds",
                          getTimeSeconds(
                            review ? reviewTime : ansTime,
                            elapsedTime
                          )
                        )}
                      </span>
                    )}
                  </CountdownCircleTimer>
                </div>
                <div className="row" style={{ alignItems: "center" }}>
                  <div className="col-12">
                    <DialogContent
                      style={{
                        height: "50vh",
                        maxHeight: "80vh",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h5">
                          {"Q)" +
                            authState.friends[id].decks[currentDeckId].cards[
                              currentCardId
                            ].question}
                        </Typography>
                        {correct === "" ? (
                          <>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="answer"
                              label="Answer"
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              onKeyDown={(ev) => {
                                if (ev.key === "Enter") {
                                  ev.preventDefault();
                                  checkAndAddResponse();
                                  setReview(true);
                                }
                              }}
                              type="email"
                              style={{ width: "300px" }}
                              fullWidth
                              variant="outlined"
                            />
                            <Button
                              style={{ width: "200px" }}
                              variant="contained"
                              onClick={() => {
                                checkAndAddResponse();
                                setReview(true);
                              }}
                            >
                              Submit
                            </Button>
                          </>
                        ) : (
                          <>
                            {correct === "Correct" ? (
                              <>
                                <Typography variant="h6"> Correct! </Typography>
                                <Typography variant="h6">
                                  {" "}
                                  A)
                                  {
                                    authState.friends[id].decks[currentDeckId]
                                      .cards[currentCardId].answer
                                  }
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography variant="h6">Wrong!</Typography>
                                <Typography variant="h6">
                                  {" "}
                                  A)
                                  {
                                    authState.friends[id].decks[currentDeckId]
                                      .cards[currentCardId].answer
                                  }
                                </Typography>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </div>
                </div>
              </>
            )}
          </div>
        </Dialog>
      )}
      {currentDeckId !== -1 && (
        <Dialog
          open={resultOpen}
          TransitionComponent={Transition}
          onClose={handleCloseResult}
          style={{
            color: "#FCFFE7",
          }}
          fullWidth
          maxWidth="md"
        >
          <div
            className="row"
            style={{ alignItems: "center", backgroundColor: "#f2e6c4" }}
          >
            <div className="col-12">
              <DialogContent
                style={{
                  height: "50vh",
                  maxHeight: "80vh",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h2">Results</Typography>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      style={{ color: "#363062" }}
                      variant="determinate"
                      size={80}
                      value={
                        (score * 100) /
                        authState.friends[id].decks[currentDeckId].cards.length
                      }
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                      >
                        {score +
                          "/" +
                          authState.friends[id].decks[currentDeckId].cards
                            .length}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h4">
                    {score >
                    authState.friends[id].decks[currentDeckId].cards.length *
                      0.8
                      ? "Awesome! Keep It Up!"
                      : "You Can Do Better!!"}
                  </Typography>
                </div>
              </DialogContent>
            </div>
          </div>
        </Dialog>
      )}
      <Leaderboard
        open={leaderboardOpen}
        set={setLeaderboardOpen}
        id={
          currentDeckId === -1
            ? -1
            : authState.friends[id].decks[currentDeckId]._id
        }
      ></Leaderboard>
    </>
  );
};
