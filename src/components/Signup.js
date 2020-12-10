import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { storage } from "./firebase.js";
import Navbar from "./Navbar"

//creat a class for the sign up component
export default class Signup extends Component {
    constructor(props) {
        super(props);
        //bind functions, you can use this.function without the need to bind it everytime
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      //the keys are the same as the Schema .. see the modle userSchema in user.model.js line 6 or so.
      //this will work as blue prent to our state
        this.state = {
            username: '',
            password:'',
            phone:'',
            address:'',
            image:null,
            url :'',
            progress:0,
          }
        }
        //onChance function to track the changes and help to set (change) the state .
          onChangeUsername(e) {
            this.setState({
             username : e.target.value
            })
          }
          onChangePassword(e) {
            this.setState({
            password : e.target.value
            })
          }
          onChangePhone(e) {
            this.setState({
                phone : e.target.value
            })
          }
          onChangeAddress(e) {
            this.setState({
                address : e.target.value
            })
          }
          handleChangeImage(e) {
          if (e.target.files[0]) {
            this.setState({
            image: e.target.files[0]
            })
        }
    }
    // it handles the upload of the picture in the firbase
    handleUpload (e) {
      e.preventDefault(); 
      var uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            var progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({
              progress:progress})
            },
            error => {
            console.log(error);
           },
            () => {
              storage
              .ref("images")
              .child(this.state.image.name)
              .getDownloadURL()
              .then(url => {
                this.setState({
                  url : url
              })
              });
              }
              );
           }
          onSubmit(e) {
            e.preventDefault();
        //where we set the state and send it in the post request
            const user = {
              username: this.state.username,
              password: this.state.password,
              phone: this.state.phone,
              address: this.state.address,
              image: this.state.url,
            }
            axios.post("http://localhost:3000/addUser/adduser", user)
            .then(res => {
            window.location = '/login'
            })
           .catch(err => alert('user name or phone number is used') );
            //console.log('user added')
        }
//where the magic happence
    render(){
        return (
          <div>
            <Navbar/>
            <br />
            <div className = "container text-center">
            <form className="text-center border border-light p-9" onSubmit={this.onSubmit}>
                <h3 className = "mb-3">
                Sign Up
                </h3>
                <br />
                <div className = "col">
                <label > User Name </label>
                <br></br>
                <input required='true' type='text'className="form-control col"value= {this.setState.username}onChange={this.onChangeUsername} placeholder='User Name'/>
                <br></br>
                </div>
                <div className = "col">
                <label > Creat Password </label>
                <br></br>
                <input required='true'  type="password" name="password" className="form-control col"value= {this.setState.password} onChange={this.onChangePassword} placeholder='Creat Password' />
                <br></br>
                </div>
                <div className = "col">
                <label > Phone Number </label>
                <input required='true'  className="form-control col"  value= {this.setState.phone} onChange={this.onChangePhone} placeholder='Phone Number' />
                <br></br>
                </div>
                <div className = "col">
                <label > Address </label>
                <br></br>
                <input required='true' type='text' className="form-control col" value= {this.setState.address} onChange={this.onChangeAddress} placeholder='Address' />
                <br></br>
                </div>
                <div className = "col">
                            <label>Image</label>
                           <div  id='image' > <img src={this.state.url || "http://via.placeholder.com/50*50"}
                             /></div>
                           <input  type="file" onChange={this.handleChangeImage.bind(this)} className="btn btn-deep-orange darken-4" />
                           <button  onClick={this.handleUpload.bind(this)} className="btn btn-deep-orange darken-4">Upload</button>
                           </div>
                            <br />
                <input type='submit' value='Creat Account' className="btn btn-deep-orange darken-4"/>
                <br></br>
                <br></br>
                <b>If you already have an account<a href='/login'> Log In </a></b>
                <br></br>
            </form>
            </div>
            <Footer />
            </div>
        )
    }
}