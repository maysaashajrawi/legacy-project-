// import React, { Component } from "react";
// // import { Link, withRouter } from "react-router-dom";
// import axios from "axios";

// class Counter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counter: [],
//     };
//   }
//   componentDidMount() {
//     axios
//       .get("http://localhost:3000/addItems")
//       .then((res) => {
//         // console.log(res.data.length);
//         this.setState({ counter: res.data.length });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   render() {
//     return <h2>{this.state.counter}</h2>;
//   }
// }

// export default Counter;


import React, { Component } from "react";
// import { Link, withRouter } from "react-router-dom";
import axios from "axios";
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/addItems")
      .then((res) => {
        // console.log(res.data.length);
        this.setState({ counter: res.data.length });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return <h2>{this.state.counter}</h2>;
  }
}
export default Counter;






