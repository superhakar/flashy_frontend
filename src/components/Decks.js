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
import { useHistory } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slide from "@mui/material/Slide";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Decks = () => {
  const INITIAL_OPTIONS = [
    { label: "SPE", value: "spe" },
    { label: "HCAD", value: "hcad" },
    { label: "ML", value: "ml" },
    { label: "Placement", value: "placement" },
    { label: "OS", value: "os" },
  ];
  let history = useHistory()
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [name, setName] = useState("");
  const [readOpen, setReadOpen] = useState(false);
  const [currentCardId,setCurrentCardId] = useState(0);
  const [currentDeckId, setCurrentDeckId] = useState(-1);


const handleSubmit = () => {
  console.log("Add Deck!!!!!!");
  let tags = selectedTags.map((t) => t.label);
  console.log(name, tags);

  setOpen(false)
    axios
      .post("/decks/addDeck", { name,tags })
      .then((res) => {
        console.log(res);
        dispatch(notifySuccess("Create Deck Successfully"));
        dispatch(userLoad())
      })
      .catch((err) => {
        dispatch(notifyError(err.response.data.errors[0].msg));
      });
  setName("")
  setSelectedTags([])
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseRead = () => {
    setReadOpen(false);
  };

  return (
    <>
      <div style={{ backgroundColor: "#E9D5DA" }}>
        <Button onClick={() => history.push("/home")} style={{ float: "left" }}>
          <ArrowBackIcon style={{ color: "#362062", fontSize: "8vh" }} />
        </Button>
        <div className="row" style={{ width: "80%", marginLeft: "10%" }}>
          {authState.decks.map((d, ind) => {
            return (
              <div className="col-4" style={{ padding: "20px" }}>
                <Paper
                  elevation={3}
                  key={d._id}
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
                          {d.name}
                        </Typography>
                        <Typography align="center">
                          {d.tags.map((t) => {
                            return (
                              <span>
                                <LocalOfferIcon style={{ color: "#363062" }} />
                                {" " + t + " "}
                              </span>
                            );
                          })}
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
                              variant="contained"
                              onClick={() => history.push("/cards/" + ind)}
                            >
                              View Cards
                            </Button>
                            <Button variant="outlined">Edit Deck</Button>
                          </div>
                          <div
                            style={{
                              padding: "5px",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => {
                                setReadOpen(true);
                                setCurrentDeckId(ind);
                                setCurrentCardId(0);
                              }}
                            >
                              Read
                            </Button>
                            <Button variant="outlined">Read & Quiz</Button>
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
        <DialogTitle>Create Deck</DialogTitle>
        <DialogContent
          style={{
            height: "50vh",
            maxHeight: "80vh",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Deck Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="standard"
          />
          <Typography style={{ marginTop: "10px", marginBottom: "10px" }}>
            Select Tags:
          </Typography>
          <MultiSelect
            options={INITIAL_OPTIONS}
            value={selectedTags}
            onChange={setSelectedTags}
            labelledBy="Select Tags"
            isCreatable={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
      {currentDeckId !== -1 && (
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
          <div className="row" style={{ alignItems: "center" }}>
            <div
              className="col-1"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (currentCardId > 0) setCurrentCardId(currentCardId - 1);
              }}
            >
              <ChevronLeftIcon style={{ fontSize: "4em" }}></ChevronLeftIcon>
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
                <Typography variant="h5">
                  {authState.decks[currentDeckId].cards[currentCardId].content}
                </Typography>
                <Typography>
                  Q)
                  {" " +
                    authState.decks[currentDeckId].cards[currentCardId]
                      .question}
                </Typography>
                <Typography>
                  A)
                  {" " +
                    authState.decks[currentDeckId].cards[currentCardId].answer}
                </Typography>
              </DialogContent>
            </div>
            <div
              className="col-1"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (currentCardId < authState.decks[currentDeckId].cards.length-1) setCurrentCardId(currentCardId + 1);
              }}
            >
              <ChevronRightIcon style={{ fontSize: "4em" }}></ChevronRightIcon>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};
