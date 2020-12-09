import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar_Login extends Component {
  render() {
    return (
      <div>
        <nav
          style={{ color: "red" }}
          className="navbar navbar-dark bg-dark navbar-expand-lg"
        >
          <Link to="/Homepage" className="navbar-brand">
            DAFAH
          </Link>

          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/AddItems" className="nav-link">
                  Add Items
                </Link>
              </li>

              <li className="navbar-item">
                <Link to="/Profile" className="nav-link">
                  Profile
                </Link>
              </li>

              <li className="navbar-item" onClick={logout}>
                <Link to="/logout" className="nav-link">
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function logout() {
  window.localStorage.clear();
  window.location = "/Homepage";
}
