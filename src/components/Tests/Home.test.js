import { render, screen } from "@testing-library/react";
import { Home } from "../Home";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combinedReducers from "../../reducers/CombinedReducers";

const store = createStore(combinedReducers, compose(applyMiddleware(thunk)));

test("Render Decks link in home", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  const linkElement = screen.getByText("Decks");
  expect(linkElement).toBeInTheDocument();
});
test("Render quiz history link in home", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  const linkElement = screen.getByText(/Quiz History/i);
  expect(linkElement).toBeInTheDocument();
});
