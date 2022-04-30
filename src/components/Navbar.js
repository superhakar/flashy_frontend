import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import { Button, Link } from "@mui/material";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";

export const Navbar = () => {
  const authState = useSelector((state) => state.AuthReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <AppBar
        position="static"
        style={{ color: "#E9D5DA", backgroundColor: "#363062" }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link href="/" underline="none">
            <Typography
              variant="h5"
              component="div"
              style={{ color: "#E9D5DA" }}
            >
              Flashy
            </Typography>
          </Link>
          <Box>
            {authState.authStatus === "Success" ? (
              <>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ color: "#E9D5DA" }}
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
                    <MenuItem>
                      <Link
                        href="/changePassword"
                        underline="none"
                        sx={{ color: "#363062" }}
                      >
                        {" "}
                        <KeyIcon /> Change Password
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
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
                <Link href="/login" underline="none">
                  <Button sx={{ color: "#E9D5DA" }}>Login</Button>
                </Link>
                <Link href="/register" underline="none">
                  <Button sx={{ color: "#E9D5DA" }}>Sign Up</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
