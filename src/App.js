import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Homepage from './components/Homepage';
import AddItems from './components/AddItems';
import ItemsList from './components/ItemsList';
import Login from './components/Login';
import Signup from './components/Signup';
import EditItems from './components/edit';
import Homepage2 from "./components/Homepage2.js";
import Counter from "./components/Counter.js";
import Edituser from "./components/edituser";
import ItemsList2 from './components/ItemsList2';

import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";
import Personalprofile from "./components/Personalprofile";

function App() {
  return (
    <Router className="container">
      <div>
        <Route path="/homepage2" component={Homepage2} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/ItemsList" component={ItemsList} />
        <PrivateRoute path="/addItems" component={AddItems} />
        <PrivateRoute path="/edituser/:id" component={Edituser} />
        <Route path = "/addUser"  component = { Signup } />
        <Route path="/Profile" component={Personalprofile} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/edit/:id" component={EditItems} />
        <PrivateRoute path="/logout" component={Login} />
        <Route path="/Counter" component={Counter} />
        <PrivateRoute path="/ItemsList2" component={ItemsList2} />
        <Route path="/" exact component={Homepage} />
      </div>
    </Router>
  );
}

export default App;
