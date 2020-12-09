import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

import Homepage from "./components/Homepage";

import AddItems from "./components/AddItems";
import ItemsList from "./components/ItemsList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EditItems from "./components/edit";
import Homepage2 from "./components/Homepage2.js";
import Profile from "./components/Profile.js";
import Counter from "./components/Counter.js";

function App() {
  return (
    <Router className="container">
      <div>
        <Route path="/Profile" component={Profile} />
        <Route path="/homepage2" component={Homepage2} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/ItemsList" component={ItemsList} />
        <Route path="/addItems" component={AddItems} />
        <Route path="/addUser" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/edit/:id" component={EditItems} />
        <Route path="/logout" component={Login} />
        <Route path="/Counter" component={Counter} />
      </div>
    </Router>
  );
}

export default App;
