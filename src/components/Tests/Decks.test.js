import { render, screen } from "@testing-library/react";
import { Decks } from "../Decks";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combinedReducers from "../../reducers/CombinedReducers";

const store = createStore(combinedReducers, compose(applyMiddleware(thunk)));

test("Render Add deck link in decks page", () => {
  render(
    <Provider store={store}>
      <Decks />
    </Provider>
  );
  const linkElement = screen.getByText("ADD");
  expect(linkElement).toBeInTheDocument();
});
