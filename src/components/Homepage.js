import React, { Component } from "react";
import Slideshow from "./Carousel";
import Cards from "./Cards";
import { MDBContainer, MDBFooter } from "mdbreact";
import Navbar from "./Navbar";

export default class Homepage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     counter: 0,
  //   };
  // }
  render() {
    return (
      <div className="bg-dark justify-content-between">
        <Navbar />
        {/* <a>
          <i class="fa fa-heart" aria-hidden="true">
            <h2
              onClick={() => this.setState({ counter: this.state.counter + 1 })}
            ></h2>
          </i>
        </a> */}
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
