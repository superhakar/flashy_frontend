import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE
} from "../common/Constants";

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};
export const signupFailure = (err) => ({
  type: SIGNUP_FAILURE,
  err: err,
});

export const loginSuccess = (userDetails) => {
    return {
        type: LOGIN_SUCCESS,
        userDetails: userDetails
    }
}
export const loginFailure = (err) => ({
    type: LOGIN_FAILURE,
    err: err
})

export const loadUserSuccess = (userDetails) => {
  return {
    type: LOAD_USER_SUCCESS,
    userDetails: userDetails,
  };
};

export const loadUserFailure = (err) => ({
  type: LOAD_USER_FAILURE,
  err: err,
});

