//Services
import axios from "../common/AxiosConfig";
import {
  loginFailure,
  loginSuccess,
  signupFailure,
  signupSuccess,
  loadUserFailure,
  loadUserSuccess,
  logoutUser
} from "../actionCreators/AuthActions";
import { notifySuccess, notifyError} from "../actionCreators/NotifyActions"

export const userLogin = (name, password, history) => {
  console.log("username:", name);
  console.log("passw:", password);
  return (dispatch) => {
    axios
      .post("/users/auth", { name, password })
      .then((res) => {
        if (!res.data) {
          dispatch(loginFailure("Username or password is incorrect"));
          dispatch(notifyError("Username or password is incorrect"));
        }
        dispatch(loginSuccess(res.data));
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
        history.push("/home");
        const loadUser = (history) => userLoad(history)(dispatch);
        loadUser(history);
      })
      .catch((err) => {
        dispatch(notifyError(err.response.data.errors[0].msg));
        dispatch(loginFailure(err.response.data));
      });
  };
};

export const userLogout = (history) => {
  return (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch(logoutUser())
    // history.push("/landing");
  };
};

export const userSignup = (name, password, history) => {
  console.log("username:", name);
  console.log("passw:", password);
  return (dispatch) => {
    axios
      .post("/users/register", { name, password })
      .then((res) => {
        console.log(res);
        dispatch(signupSuccess());
        dispatch(notifySuccess("User Registered Successfully"))
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        dispatch(notifyError(err.response.data.errors[0].msg));
        dispatch(signupFailure(err.message));
      });
  };
};

export const userLoad = (history) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
      axios
        .get("/users/auth")
        .then((res) => {
          dispatch(loadUserSuccess(res.data));
          if(history) history.push("/home");
        })
        .catch((err) => {
            console.log(err)
            dispatch(notifyError(err.response.data.errors[0].msg));
          history.push("/login");
        });
    } else {
      history.push("/login");
    }
  };
};
