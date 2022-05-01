import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { notifyClear } from "../actionCreators/NotifyActions";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const Notify = () => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const alertState = useSelector((state) => state.NotifyReducer);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(notifyClear());
  };
  const position = {
    vertical: alertState.vertical,
    horizontal: alertState.horizontal,
  };
  useEffect(() => {});
  return (
    <Snackbar
      open={alertState.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={position}
    >
      <Alert
        onClose={handleClose}
        severity={alertState.severity}
        style={{
          width: "100%",
          color: alertState.color,
          backgroundColor: alertState.backgroundColor,
        }}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
};
