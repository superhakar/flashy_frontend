import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
export const Register = () => {
  const avatarStyle = { backgroundColor: "#363062" };
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
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Confirm Password"
          placeholder="Re-Enter password"
          type="password"
          fullWidth
          required
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
        >
          Sign up
        </Button>
      </Paper>
    </Grid>
  );
};
