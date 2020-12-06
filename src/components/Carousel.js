import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
export default class Slideshow extends Component {
    render() {
        return(
          <div>                
          <Carousel className = "container" >
          <Carousel.Item interval={2000}>
              <img
              className="d-block w-100 img-responsive"
              src={process.env.PUBLIC_URL + "./Images/FirstSlide_Kid.jpg"}
              alt="First slide"
              width="50%" height="500px"
              />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
              <img
              className="d-block w-100 img-responsive"
              src={process.env.PUBLIC_URL + "./Images/SecondSlide_Children.jpg"}
              alt="Third slide"
              width="50%" height="500px"
              />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
              <img
              className="d-block w-100 img-responsive"
              src={process.env.PUBLIC_URL + "./Images/ThirdSlide_Children.jpg"}
              alt="Third slide"
              width="50%" height="500px"
              />           
          </Carousel.Item>
        </Carousel>
        </div>
        )
    }
}