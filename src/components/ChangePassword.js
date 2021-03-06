import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import KeyIcon from "@mui/icons-material/Key";
import { notifySuccess, notifyError } from "../actionCreators/NotifyActions";
import axios from "../common/AxiosConfig";
import { useDispatch } from "react-redux";

export const ChangePassword = () => {
  const avatarStyle = { backgroundColor: "#363062" };
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = () => {
    console.log("Change Password!!!!!!");
    if (password === confirmPassword) {
      axios
        .post("/users/modify", { password })
        .then((res) => {
          console.log(res);
          dispatch(notifySuccess("Password Changed Successfully"));
        })
        .catch((err) => {
          dispatch(notifyError(err.response.data.errors[0].msg));
        });
    }
    else{
      dispatch(notifyError("Password must match"));
    }
  };
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
            <KeyIcon />
          </Avatar>
          <h2>Change Password</h2>
        </Grid>
        <TextField
          label="New Password"
          placeholder="Enter New password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Confirm Password"
          placeholder="Re-Enter New password"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Change Password
        </Button>
      </Paper>
    </Grid>
  );
};
