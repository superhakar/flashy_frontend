import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./components/Navbar"
import { Landing } from "./components/Landing";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Decks } from "./components/Decks";
import { ChangePassword } from "./components/ChangePassword";


function App() {
  const authState = useSelector((state)=>state.AuthReducer)
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/decks" component={Decks} />
            <Route exact path="/changePassword" component={ChangePassword} />
            <Redirect from="*" to="/"></Redirect>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
