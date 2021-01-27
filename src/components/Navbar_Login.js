import React, { Component } from "react";
import { Link } from "react-router-dom";
import Counter from './Counter'

export default class Navbar_Login extends Component {
  render() {
    return (
      <div>
        <nav
          style={{ color: "red" }}
          className="navbar navbar-dark bg-dark navbar-expand-lg"
        >
          <Link to="/Homepage2" className="navbar-brand">
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
                <Link to="/ItemsList2" className="nav-link">
                  donated items
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
           
            <a>
              <i class="fa fa-heart" aria-hidden="true" style = {{color: "white"}} >

                <Counter />
                Donated items and still counting ! !
              </i>
             
            </a>
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
