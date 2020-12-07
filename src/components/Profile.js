import React from "react";
import axios from "axios";
import { storage } from "./firebase.js";
import { withRouter } from "react-router-dom";
import Footer from "./Footer";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone_number: "",
      password: "",
      address: "",
      userId: "",
      image: null,
      url: "",
      progress: 0,
    };

    // bind inside the constructor

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePhone_number = this.handleChangePhone_number.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  // take the name and set state for it in every changing
  handleChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  //take the phone number and set state for it in every changing
  handleChangePhone_number(event) {
    this.setState({
      phone_number: event.target.value,
    });
  }

  //take the password and set state for it in every changing
  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  //take the address and set state for it in every changing
  handleChangeAddress(event) {
    this.setState({
      address: event.target.value,
    });
  }

  // it addes the values of the input fileds in the states
  handleChangeImage(event) {
    if (event.target.files[0]) {
      this.setState({
        image: event.target.files[0],
      });
    }
  }
  // it handles the upload the image in the firbase
  handleUpload() {
    var uploadTask = storage
      .ref(`images/${this.state.image.name}`)
      .put(this.state.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({
          progress: progress,
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({
              url: url,
            });
          });
      }
    );
  }

  // what happen when we click the add button
  handleAdd(event) {
    var name = this.state.name;
    var phone_number = this.state.phone_number;
    var password = this.state.password;
    var address = this.state.address;
    var image = this.state.url;
    var userId = this.state.userId;
    // post request to create the user info
    axios
      .post("/insert", {
        name: name,
        phone_number: phone_number,
        password: password,
        address: address,
        image: image,
        userId: userId,
      })
      .then((res) => console.log(res.data))
      .catch((err) => (window.location = "/"));
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <form
            className="text-center border border-light p-9"
            action="#!"
            onSubmit={this.handleAdd}
          >
            <h3>
              {" "}
              "Only by giving are you able to receive more than you already
              have." -Jim Rohn{" "}
            </h3>

            <p className="h4 mb-4">Donate Your Item</p>

            <div className="col">
              <label>User Name</label>
              <input
                required="true"
                type="text"
                className="form-control"
                value={this.state.name} // from submitting
                onChange={this.handleChangeName}
                text-align="center"
                placeholder="Please insert your name"
              />
            </div>

            <br />

            <div className="col">
              <label>Phone Number</label>
              <input
                type="number"
                required="true"
                className="form-control"
                value={this.state.phone_number}
                onChange={this.handleChangePhone_number}
                placeholder="Please insert your phone"
              />
            </div>

            <br />
            <div className="col">
              <label>Password</label>
              <input
                type="number"
                required="true"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChangePassword}
                placeholder="Password"
              />
            </div>

            <br />

            <div className="col">
              <label>Address </label>
              <input
                type="text"
                required="true"
                className="form-control"
                value={this.state.address}
                onChange={this.onChangeAddress}
                placeholder="Please insert your address"
              />
            </div>
            <br />

            <div className="col">
              <label>Image</label>
              <div id="image">
                {" "}
                <img
                  src={this.state.url || "http://via.placeholder.com/50 50"}
                  alt="firebase"
                />
              </div>
              <input
                type="file"
                onChange={this.handleChangeImage.bind(this)}
                className="btn btn-deep-orange darken-4"
              />
              <button
                onClick={this.handleUpload.bind(this)}
                className="btn btn-deep-orange darken-4"
              >
                Upload
              </button>
            </div>
            <br />

            <div>
              <button
                type="Add"
                value="add"
                className="btn btn-deep-orange darken-4"
              >
                Add your account{" "}
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Profile);
