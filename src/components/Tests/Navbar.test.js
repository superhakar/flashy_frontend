import { render, screen } from "@testing-library/react";
import { Navbar } from "../Navbar";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combinedReducers from "../../reducers/CombinedReducers";

const store = createStore(combinedReducers, compose(applyMiddleware(thunk)));

test("Render Login in navbar", () => {
  render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
  const linkElement = screen.getByText("Login");
  expect(linkElement).toBeInTheDocument();
});
test("Render Register in navbar", () => {
  render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
  const linkElement = screen.getByText(/Sign up/i);
  expect(linkElement).toBeInTheDocument();
});
