import React, { Component } from "react";
import Slideshow from "./Carousel";
import Cards from "./Cards";
import { MDBContainer, MDBFooter } from "mdbreact";
import Navbar_Login from "./Navbar_Login";

export default class Homepage2 extends Component {
  render() {
    return (
      <div className="bg-dark justify-content-between">
        <Navbar_Login />
        <br />
        <Slideshow />
        <br />
        <Cards className="d-flex justify-content-around" />
        <div className="footer-copyright text-center py-3">
          <MDBFooter>
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} DAFAH - All Rights Reserved
            </MDBContainer>
          </MDBFooter>
        </div>
      </div>
    );
  }
}
