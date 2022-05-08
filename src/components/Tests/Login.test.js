import { render, screen } from "@testing-library/react";
import {Login} from "../Login";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combinedReducers from "../../reducers/CombinedReducers";

const store = createStore(combinedReducers, compose(applyMiddleware(thunk)));

test("Render login form", () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const formElement = screen.getByRole("textbox");
  expect(formElement).toBeInTheDocument();
});
