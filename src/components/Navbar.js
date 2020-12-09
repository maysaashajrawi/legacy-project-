import React, { Component } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Counter from "./Counter";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: "",
    };
  }

  render() {
    return (
      <div>
        <nav
          style={{ color: "orange" }}
          className="navbar navbar-dark bg-dark navbar-expand-lg"
        >
          <Link to="/Homepage" className="navbar-brand">
            DAFAH
          </Link>

          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/ItemsList" className="nav-link">
                  Clothes
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>

            <a>
              <i class="fa fa-heart" aria-hidden="true">
                <Counter />
              </i>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}
