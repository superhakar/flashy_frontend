import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import { Button, Link } from "@mui/material";
import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";
import { userLogout } from "../services/AuthServices";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export const Navbar = () => {
  let history = useHistory();
  const authState = useSelector((state) => state.AuthReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const logout = (history) =>
    userLogout(history)(dispatch);
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {console.log(authState.username)}, [authState.username]);
  const goto = (url) => { history.push(url) }
  return (
    <Box>
      <AppBar
        position="static"
        style={{ color: "#E9D5DA", backgroundColor: "#363062" }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            component="div"
            style={{ color: "#E9D5DA", cursor: "pointer" }}
            onClick={() => goto("/home")}
          >
            Flashy
          </Typography>
          <Box>
            {authState.authStatus === "Success" ? (
              <>
                <div>
                  <Button
                    style={{ color: "#E9D5DA" }}
                    onClick={() => goto("/decks")}
                  >
                    Decks
                  </Button>
                  <Button
                    style={{ color: "#E9D5DA" }}
                    onClick={() => goto("/quizHistory")}
                  >
                    Quiz History
                  </Button>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{ color: "#E9D5DA" }}
                  >
                    <PersonIcon />
                    {" " + authState.username + " "}
                    <ArrowDropDownIcon />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    style={{ color: "#FCFFE7" }}
                  >
                    <MenuItem
                      onClick={() => {
                        history.push("/changePassword");
                        handleClose();
                      }}
                    >
                      <KeyIcon /> Change Password
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout(history);
                        handleClose();
                      }}
                    >
                      <Link
                        href="/login"
                        underline="none"
                        sx={{ color: "#363062" }}
                      >
                        <LogoutIcon /> Logout
                      </Link>
                    </MenuItem>
                  </Menu>
                </div>
              </>
            ) : (
              <>
                <Button
                  style={{ color: "#E9D5DA" }}
                  onClick={() => goto("/login")}
                >
                  Login
                </Button>
                <Button
                  style={{ color: "#E9D5DA" }}
                  onClick={() => goto("/register")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
