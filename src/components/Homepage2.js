import React, { Component } from "react";
import Slideshow from "./Carousel";
import Cards from "./Cards";
import { MDBContainer, MDBFooter } from "mdbreact";
import Navbar_Login from "./Navbar_Login";
// import axios from "axios";

export default class Homepage2 extends Component {
  // componentDidMount() {
  //   axios
  //     .get("http://localhost:3000//:id/")
  //     .then((res) => {
  //       this.setState({ counter: res.data });
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

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
