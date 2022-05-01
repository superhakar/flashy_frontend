import React, { useState,useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignup } from "../services/AuthServices";
import { notifySuccess, notifyError } from "../actionCreators/NotifyActions";


export const Register = () => {
  let history = useHistory();
  const avatarStyle = { backgroundColor: "#363062" };
  const [username,setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const signup = (username,password,history) => userSignup(username,password,history)(dispatch);
  const handleSubmit = () =>{
      console.log("Register!!!!!!")
    if(password === confirmPassword)
    signup(username,password,history);
    else dispatch(notifyError("Passwords must match"))
  }
  useEffect(() => {}, []);

  return (
    <Grid className="page">
      <Paper
        elevation={10}
        style={{
          padding: 20,
          height: "50vh",
          width: 320,
          marginTop: "-10%",
          backgroundColor: "#FCFFE7",
        }}
      >
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AppRegistrationIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Confirm Password"
          placeholder="Re-Enter password"
          type="password"
          fullWidth
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          style={{ marginBottom: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            marginBottom: "20px",
            maxWidth: "200px",
            backgroundColor: "#363062",
            color: "#E9D5DA",
          }}
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </Paper>
    </Grid>
  );
};
