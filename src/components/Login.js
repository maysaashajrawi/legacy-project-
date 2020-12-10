import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Navbar from "./Navbar"
export default class Login extends Component {
    constructor(props) {
        super(props);  
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password:'',
            
                     }
    }
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
      onSubmit(e) {
        e.preventDefault();
    //where we set the state and send it in the post request
        const user = {
          username: this.state.username,
          password: this.state.password
        } 
        axios.post("http://localhost:3000/addUser/login", user)
        .then(response =>{
          // console.log (response)
          localStorage.setItem('user-tooken', response.data.token);
          localStorage.setItem('username', response.data.user.username);
          if(localStorage.getItem('user-tooken' , response.data.token)){
            console.log(localStorage.getItem('user-tooken'))
            window.location = '/homepage2';
            }
          })
        .catch(err => 
          console.log("username or password is incorrect")
          // document.getElementById("danger").innerHTML="username or password is incorrect" 
          );         
    }
    render(){
        return (
          
               <div>
                 <Navbar/>
               <br />
               <div className = "container">
                <form className="text-center border border-light p-9" onSubmit={this.onSubmit}>
                <h3 className = "mb-3">
                Login
                </h3>
                <br />
                <div className="col">
                <label > User Name </label>
                <br></br>
                <input required = "true" className = "col" type='text' className="form-control" value= {this.setState.username}onChange={this.onChangeUsername} placeholder='Enter Your User Name'/>                   
                <br></br>
                </div>
                <br></br>
                <div className="col">
                <label > Password </label>
                <br></br>
                <input required = "true"  className = "col" type="password" name="password" className="form-control col"value= {this.setState.password} onChange={this.onChangePassword} placeholder='Enter Your Password' />
                </div>
                <br></br>
                <input type='submit' value='Log In' className="btn btn-deep-orange darken-4"/>
                <br></br>
                <br></br>
                <p>Don't have an account? <a href='/addUser/adduser'> Sign Up</a></p>
                </form>
                
                <div className = "danger"></div>
             </div>
             <Footer />
             </div>
        )  
    }
}
