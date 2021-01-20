import React, { Component } from "react";
import Slideshow from "./Carousel";
import Cards from "./Cards";
import { MDBContainer, MDBFooter } from "mdbreact";
import NavbarLogin from "./NavbarLogin";

export default class Homepage2 extends Component {
  render() {
    return (
      <div className="bg-dark justify-content-between">
        <NavbarLogin />
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
