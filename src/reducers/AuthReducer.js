import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT,
} from "../common/Constants";

const initialState = {
  username: "",
  decks: [],
  authStatus: "",
  registerStatus: "",
  authErrMsg: "",
};

export const AuthReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authStatus: "Success",
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        authStatus: "Success",
        username: action.userDetails.name,
        decks: action.userDetails.decks,
      };
    case LOGIN_FAILURE:
    case LOAD_USER_FAILURE:
      return {
        ...state,
        authStatus: "Error",
        authErrMsg: action.err,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        registerStatus: "Success",
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        registerStatus: "Error",
        authErrMsg: action.err,
      };
    case LOGOUT:
      return {
        ...state,
        authStatus: "",
      }
    default:
      return state;
  }
};
