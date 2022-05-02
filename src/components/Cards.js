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
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import plusLogo from "../Plus.png";
import Button from "@mui/material/Button";
import { notifySuccess, notifyError } from "../actionCreators/NotifyActions";
import axios from "../common/AxiosConfig";
import { useDispatch } from "react-redux";
import { userLoad } from "../services/AuthServices";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slide from "@mui/material/Slide";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Cards = () => {
  let history = useHistory();
  let { id } = useParams();
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openCard, setOpenCard] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState(-1);

  const handleSubmit = () => {
    console.log("Add Card!!!!!!");
    console.log({ content, question, answer, deckId: authState.decks[id]._id });

    setOpen(false);
    axios
      .post("/cards/addCard", {
        content,
        question,
        answer,
        deckId: authState.decks[id]._id,
      })
      .then((res) => {
        console.log(res);
        dispatch(notifySuccess("Created Card Successfully"));
        dispatch(userLoad());
      })
      .catch((err) => {
        dispatch(notifyError(err.response.data.errors[0].msg));
      });
    setContent("");
    setQuestion("");
    setAnswer("");
  };

  const handleEditSubmit = () => {
    console.log("Edit Card!!!!!!");
    console.log({ content, question, answer, deckId: authState.decks[id]._id });

    setOpen(false);
    axios
      .post("/cards/editCard", {
        cardId: authState.decks[id].cards[selected]._id,
        content,
        question,
        answer,
        deckId: authState.decks[id]._id,
      })
      .then((res) => {
        console.log(res);
        dispatch(notifySuccess("Edited Card Successfully"));
        dispatch(userLoad());
      })
      .catch((err) => {
        dispatch(notifyError(err.response.data.errors[0].msg));
      });
    setContent("");
    setQuestion("");
    setAnswer("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleCloseCard = () => {
    setOpenCard(false);
  };

  return (
    <>
      {console.log(authState.decks)}
      <div style={{ backgroundColor: "#E9D5DA" }}>
        <Button
          onClick={() => history.push("/decks")}
          style={{ float: "left" }}
        >
          <ArrowBackIcon style={{ color: "#362062", fontSize: "8vh" }} />
        </Button>
        <div className="row" style={{ width: "80%", marginLeft: "10%" }}>
          {authState.decks[id] &&
            authState.decks[id].cards.map((c, ind) => {
              return (
                <div className="col-4" style={{ padding: "20px" }}>
                  <Paper
                    elevation={3}
                    key={c._id}
                    style={{ backgroundColor: "#FCFFE7" }}
                  >
                    <Card variant="outlined">
                      <CardActionArea>
                        <CardContent
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            height: "30vh",
                            padding: "5px 5px",
                          }}
                        >
                          <Typography variant="h5" align="center">
                            {c.question}
                          </Typography>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                padding: "5px",
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Button
                                style={{ backgroundColor: "#673ab7" }}
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  setSelected(ind);
                                  setOpenCard(true);
                                }}
                              >
                                View Full Card
                              </Button>
                              <Button
                                style={{ backgroundColor: "#673ab7" }}
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  setSelected(ind);
                                  setAnswer(c.answer);
                                  setQuestion(c.question);
                                  setContent(c.content);
                                  setOpenEdit(true);
                                }}
                              >
                                Edit Card
                              </Button>
                              <Button
                                style={{ backgroundColor: "#b81828" }}
                                size="small"
                                variant="contained"
                              >
                                <DeleteOutlineIcon />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Paper>
                </div>
              );
            })}
          <div className="col-4" style={{ padding: "20px" }}>
            <Paper
              elevation={3}
              onClick={handleClickOpen}
              style={{ backgroundColor: "#FCFFE7" }}
            >
              <Card variant="outlined">
                <CardActionArea>
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "30vh",
                    }}
                  >
                    <img
                      style={{ height: "50%" }}
                      src={plusLogo}
                      alt="Plus Logo"
                    />
                    <Typography variant="h5" align="center">
                      ADD
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{
          color: "#FCFFE7",
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create Card</DialogTitle>
        <DialogContent
          style={{
            height: "50vh",
            maxHeight: "80vh",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Content"
            fullWidth
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Question"
            fullWidth
            multiline
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Answer"
            fullWidth
            multiline
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{ backgroundColor: "#673ab7" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#673ab7" }}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        style={{
          color: "#FCFFE7",
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Card</DialogTitle>
        <DialogContent
          style={{
            height: "50vh",
            maxHeight: "80vh",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Content"
            fullWidth
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Question"
            fullWidth
            multiline
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Answer"
            fullWidth
            multiline
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{ backgroundColor: "#673ab7" }}
            onClick={handleEditClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#673ab7" }}
            onClick={handleEditSubmit}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {authState.decks[id] && selected !== -1 && (
        <Dialog
          open={openCard}
          TransitionComponent={Transition}
          onClose={handleCloseCard}
          style={{
            color: "#FCFFE7",
          }}
          fullWidth
          maxWidth="md"
        >
          <DialogContent
            style={{
              height: "50",
              maxHeight: "80vh",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5">
              {authState.decks[id].cards[selected].content}
            </Typography>
            <Typography>
              Q){" " + authState.decks[id].cards[selected].question}
            </Typography>
            <Typography>
              A){" " + authState.decks[id].cards[selected].answer}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
