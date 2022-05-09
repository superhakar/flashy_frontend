import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./components/Navbar";
import { Notify } from "./components/Notify";
import { Landing } from "./components/Landing";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Decks } from "./components/Decks";
import { ChangePassword } from "./components/ChangePassword";
import { userLoad } from "./services/AuthServices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Cards } from "./components/Cards";
import { QuizHistory } from "./components/QuizHistory";
import { Friends } from "./components/Friends";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  let history = useHistory();
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const loadUser = (history) => userLoad(history)(dispatch);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      loadUser(history);
    }
  }, []);
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Notify />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/decks" component={Decks} />
            <ProtectedRoute exact path="/friends" component={Friends} />
            <ProtectedRoute exact path="/quizHistory" component={QuizHistory} />
            <ProtectedRoute exact path="/cards/:id" component={Cards} />
            <ProtectedRoute
              exact
              path="/changePassword"
              component={ChangePassword}
            />
            <Redirect from="*" to="/"></Redirect>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
