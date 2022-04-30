import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import KeyIcon from "@mui/icons-material/Key";

export const ChangePassword = () => {
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
            <KeyIcon />
          </Avatar>
          <h2>Change Password</h2>
        </Grid>
        <TextField
          label="Old Password"
          placeholder="Enter Old Password"
          fullWidth
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="New Password"
          placeholder="Enter New password"
          type="password"
          fullWidth
          required
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Confirm Password"
          placeholder="Re-Enter New password"
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
          Change Password
        </Button>
      </Paper>
    </Grid>
  );
};
