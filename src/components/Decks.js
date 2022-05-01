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

export const Decks = () => {
  const INITIAL_OPTIONS = [
    { label: "SPE", value: "spe" },
    { label: "HCAD", value: "hcad" },
    { label: "ML", value: "ml" },
    { label: "Placement", value: "placement" },
    { label: "OS", value: "os" },
  ];
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [name, setName] = useState("");


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
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            height: "40vh",
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
            onChange={(e)=>setName(e.target.value)}
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
    </>
  );
};
