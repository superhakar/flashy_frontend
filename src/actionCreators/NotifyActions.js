import {
  NOTIFY_ERROR,
  NOTIFY_SUCCESS,
  NOTIFY_CLEAR
} from "../common/Constants";

export const notifySuccess = (message) => ({
  type: NOTIFY_SUCCESS,
  message: message,
});

export const notifyError = (message) => ({
  type: NOTIFY_ERROR,
  message: message,
});

export const notifyClear = () => ({
  type: NOTIFY_CLEAR,
});
