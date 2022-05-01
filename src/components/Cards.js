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
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Button from "@mui/material/Button";
import { MultiSelect } from "react-multi-select-component";
import { notifySuccess, notifyError } from "../actionCreators/NotifyActions";
import axios from "../common/AxiosConfig";
import { useDispatch } from "react-redux";
import { userLoad } from "../services/AuthServices";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Cards = () => {
  let history = useHistory();
  let { id } = useParams();
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    console.log("Add Card!!!!!!");
    console.log({ content, question, answer, deckId: authState.decks[id]._id });

    setOpen(false);
    axios
      .post("/cards/addCard", { content, question, answer, deckId: authState.decks[id]._id })
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    {console.log(authState.decks)}
      <div style={{ backgroundColor: "#E9D5DA" }}>
        <div className="row" style={{ width: "80%", marginLeft: "10%" }}>
          {authState.decks[id] && authState.decks[id].cards.map((c) => {
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
                          justifyContent: "center",
                          height: "30vh",
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
                            <Button variant="contained">View Full Card</Button>
                            <Button variant="outlined">Edit Card</Button>
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
        maxWidth="xs"
      >
        <DialogTitle>Create Card</DialogTitle>
        <DialogContent
          style={{
            height: "40vh",
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
            autoFocus
            margin="dense"
            label="Question"
            fullWidth
            multiline
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
