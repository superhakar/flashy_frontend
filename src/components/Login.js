import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LoginIcon from "@mui/icons-material/Login";

import { useDispatch } from "react-redux";
import { userLogin } from "../services/AuthServices";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const avatarStyle = { backgroundColor: "#363062" };
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const login = (username, password, history) =>
    userLogin(username, password, history)(dispatch);
  const handleSubmit = () => {
    console.log("Login!!!!!!");
    console.log(process.env.BACKEND_URL);
    login(username, password, history);
  };
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
            <LoginIcon />
          </Avatar>
          <h2>Sign In</h2>
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
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Sign in
        </Button>
        <Typography>
          {" "}
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "#363062" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
