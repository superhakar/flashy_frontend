import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from "../common/Constants";

const initialState = {
  username: "Parithi",
  decks: [
    { name: "test 1", tag: "tag1" },
    { name: "test 2", tag: "tag2" },
  ],
  authStatus: "Success",
  authErrMsg: "",
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        authStatus: "Success",
        username: action.userDetails.username,
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
        authStatus: "Success",
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        authStatus: "Error",
        authErrMsg: action.err,
      };
    default:
      return state;
  }
};
