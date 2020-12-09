import React, { Component } from "react";
import Slideshow from "./Carousel";
import Cards from "./Cards";
import { MDBContainer, MDBFooter } from "mdbreact";
import Navbar from "./Navbar";

export default class Homepage extends Component {
  render() {
    return (
      <div className="bg-dark justify-content-between">
        <Navbar />

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
