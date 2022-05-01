import {
  NOTIFY_ERROR,
  NOTIFY_SUCCESS,
  NOTIFY_CLEAR
} from "../common/Constants";

const intialState = {
  message: "",
  severity: "info",
  open: false,
  vertical: "top",
  horizontal: "right",
  backgroundColor: "",
  color: "#fff",
};
export const NotifyReducer = (state = intialState, action) => {
  switch (action.type) {
    case NOTIFY_SUCCESS:
      return {
        ...state,
        message: action.message,
        severity: "success",
        open: true,
        backgroundColor: "#2e7d32",
      };
    case NOTIFY_ERROR:
      return {
        ...state,
        message: action.message,
        severity: "error",
        open: true,
        backgroundColor: "#d32f2f",
      };
    case NOTIFY_CLEAR:
      return {
        ...state,
        message: "",
        severity: "info",
        open: false,
        backgroundColor: "",
      };
    default:
      return state;
  }
};
