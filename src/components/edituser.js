import React, { Component } from 'react';
import axios from "axios";
import { storage } from "./firebase.js";
import Footer from './Footer';


export default class Edituser extends Component {
    constructor(props) {
      super(props);
  
      //Defining the "this" in the functions using .bind method
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangePhone= this.onChangePhone.bind(this);
      this.onChangeAddress= this.onChangeAddress.bind(this);


      this.onSubmit = this.onSubmit.bind(this);
     
  
      this.state = {
        username: "",
        password: "",
        phone: "",
        address:"",
        image:null,
        url :'',
        progress:0,
      
      }
    }
    // it addes the values of the input fileds in the states
  handleChangeImage(e) {
    if (e.target.files[0]) {
        this.setState({
        image: e.target.files[0]
        })
    }
  
}
// it handles the upload of the picture in the firbase
handleUpload () {
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


       componentDidMount() {
        axios.get('http://localhost:3000/addUser/'+this.props.match.params.id)

        
          .then(response => {
            console.log(response)       // when i click the button it will send the get req to the middleware  in the data base so we will send the response and setState    part1 from the schema   :part2 from the response
            this.setState({
              username: response.data.username,
              password: response.data.password,
              phone: response.data.phone,
              address: response.data.address,
              image: response.data.image,
            })  
    
          })
          .catch(function (error) {
            console.log(error);
          })
        }



//Event Handlers:
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password : e.target.value
    });
  }
  
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  

  onSubmit(e) {
    e.preventDefault();   
    const user= {
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone,
      address:this.state.address,
    }

    console.log(user);



axios.post("http://localhost:3000/addUser/update/"+this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/ItemsList'
  }


  render(){
    return (

      <div>
        <br />
        <div className = "container text-center">
        <form className="text-center border border-light p-9" onSubmit={this.onSubmit}>
            <h3 className = "mb-3">
            Edit user information 
            </h3>
            <br />
            <div className = "col">
            <label >  New User Name </label>
            <br></br>
            <input required='true' type='text'className="form-control col"value= {this.state.username}onChange={this.onChangeUsername} placeholder='User Name'/>                   
            <br></br>                
            </div>




            <div className = "col">
            <label > New Password </label>
            <br></br>
            <input required='true'  type="password" name="password" className="form-control col"value= {this.state.password} onChange={this.onChangePassword} placeholder='Creat Password' />
            <br></br>
            </div>

            <div className = "col">
            <label >  New Phone Number </label>

            <input required='true'  className="form-control col"  value= {this.state.phone} onChange={this.onChangePhone} placeholder='Phone Number' />
            <br></br>
            </div>

            <div className = "col">
            <label >  New Address </label>
            <br></br>
            <input required='true' type='text' className="form-control col" value= {this.state.address} onChange={this.onChangeAddress} placeholder='Address' />
            <br></br>
            </div>
            

            <input type='submit' value='Edit Account' className="btn btn-deep-orange darken-4"/>
            <br></br>
            <br></br>
          <a href='/ItemsList'> Save </a>
            <br></br>
        </form>
   
        </div>
        <Footer />
        </div>
      
     
    )
}
}