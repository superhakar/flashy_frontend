import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { NotifyReducer } from "./NotifyReducer";

export default combineReducers({
  AuthReducer,
  NotifyReducer,
});
