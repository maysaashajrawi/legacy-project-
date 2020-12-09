import React, { Component } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
// import AddItems from "./AddItems";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

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
              {/* <li className="navbar-item">
                <Link to="/AddItems" className="nav-link">
                  Add Items
                </Link>
              </li> */}
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
              {/* <li className="navbar-item" onClick={logout}>
                <Link to="/logout" className="nav-link">
                  Log out
                </Link>
              </li> */}
            </ul>

            <a>
              <i
                class="fa fa-heart"
                aria-hidden="true"
                onClick={this.increment}
              >
                <h3>{this.state.counter}</h3>
              </i>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}