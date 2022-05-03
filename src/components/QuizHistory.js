import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";
import { notifyError } from "../actionCreators/NotifyActions";
import axios from "../common/AxiosConfig";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { useHistory } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


// [
//   {
//     deckId: {
//       name: "test",
//     },
//     score: 1,
//     responses: [
//       {
//         card: { answer: "4", content: "2+2=4", question: "2+2=?" },
//         answer: "4",
//         correct: true,
//       },
//       {
//         card: { answer: "5", content: "2+3=5", question: "2+3=?" },
//         answer: "4",
//         correct: false,
//       },
//     ],
//   },
// ];
export const QuizHistory = () => {
  let history = useHistory();
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [quizzes, setQuizzes] = useState([]);
  const [quizzesPlayed, setQuizzesPlayed] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState(-1);
  const [currentCardId, setCurrentCardId] = useState(-1);

  const handleCloseQuiz = () => {
    setQuizOpen(false);
    setCurrentCardId(-1);
    setCurrentQuizId(-1);
  };
  useEffect(() => {
    
    axios
      .get("/quiz/getQuiz")
      .then((res) => {
        console.log(res.data);
        setQuizzes(res.data.data);
        setQuizzesPlayed(res.data.data.length);
        let total = 0;
        res.data.data.map((q) => {
          total += q.score / q.responses.length;
        });
        setAvgScore(total / res.data.data.length);
      })
      .catch((err) => {
        dispatch(notifyError(err.response.data.errors[0].msg));
      });
  }, []);
  return (
    <>
      <div
        style={{ backgroundColor: "#E9D5DA", overflow: "auto", height: "100%" }}
      >
        <div className="row" style={{ width: "80%", marginLeft: "10%" }}>
          <div className="col-6" style={{ padding: "20px" }}>
            <Paper elevation={3} style={{ backgroundColor: "#FCFFE7" }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ color: "#363062" }}
                  >
                    Average Score: {avgScore * 100 + "%"}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </div>
          <div className="col-6" style={{ padding: "20px" }}>
            <Paper elevation={3} style={{ backgroundColor: "#FCFFE7" }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ color: "#363062" }}
                  >
                    Total quizzes played: {quizzesPlayed}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </div>
        </div>
        {quizzes.map((q, ind) => (
          <>
            <div style={{ padding: "4px", width: "75%", margin: "auto" }}>
              <Paper elevation={3} style={{ backgroundColor: "#FCFFE7" }}>
                <Card variant="outlined">
                  <CardActionArea
                    onClick={() => {
                      setQuizOpen(true);
                      setCurrentQuizId(ind);
                      setCurrentCardId(0);
                    }}
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "#363062" }}
                      >
                        Date: {new Date(q.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "#363062" }}
                      >
                        Time: {new Date(q.createdAt).toLocaleTimeString()}
                      </Typography>
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "#363062" }}
                      >
                        Deck: {q.deckId.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "#363062" }}
                      >
                        Score: {q.score} / {q.responses.length}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </div>
            {currentQuizId !== -1 && (
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
                    quizzes[currentQuizId].responses[currentCardId].correct
                      ? {
                          paddingTop: "10px",
                          backgroundColor: "#19a825",
                        }
                      : {
                          backgroundColor: "#b81828",
                          paddingTop: "10px",
                        }
                  }
                >
                  <div className="row" style={{ alignItems: "center" }}>
                    <div
                      className="col-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (currentCardId > 0)
                          setCurrentCardId(currentCardId - 1);
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
                            flexDirection: "column",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h5">
                            {"Q)" +
                              quizzes[currentQuizId].responses[currentCardId]
                                .card.question}
                          </Typography>
                          {quizzes[currentQuizId].responses[currentCardId]
                            .correct ? (
                            <>
                              <Typography variant="h6"> Correct! </Typography>
                              <Typography variant="h6">
                                {" "}
                                A)
                                {
                                  quizzes[currentQuizId].responses[
                                    currentCardId
                                  ].card.answer
                                }
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography variant="h6">Wrong Answer</Typography>
                              <Typography variant="h6">
                                {" "}
                                Given A)
                                {
                                  quizzes[currentQuizId].responses[
                                    currentCardId
                                  ].answer
                                }
                              </Typography>
                              <Typography variant="h6">
                                {" "}
                                Correct A)
                                {
                                  quizzes[currentQuizId].responses[
                                    currentCardId
                                  ].card.answer
                                }
                              </Typography>
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </div>
                    <div
                      className="col-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (
                          currentCardId <
                          quizzes[currentQuizId].responses.length - 1
                        )
                          setCurrentCardId(currentCardId + 1);
                      }}
                    >
                      {currentCardId !==
                        quizzes[currentQuizId].responses.length - 1 && (
                        <ChevronRightIcon
                          style={{ fontSize: "4em" }}
                        ></ChevronRightIcon>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog>
            )}
          </>
        ))}
      </div>
    </>
  );
};
