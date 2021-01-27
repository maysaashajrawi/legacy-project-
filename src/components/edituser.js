import React, { Component } from 'react';
import axios from "axios";
import { storage } from "./firebase.js";
import Footer from './Footer';
// eslint-disable-next-line
import Navbar_Login from "./Navbar_Login"


export default class Edituser extends Component {
    constructor(props) {
      super(props);
  
      //Defining the "this" in the functions using .bind method
      this.onChangeUsername = this.onChangeUsername.bind(this);
     
      this.onChangePhone= this.onChangePhone.bind(this);
      this.onChangeAddress= this.onChangeAddress.bind(this);

      this.onChangeimg = this.handleChangeImage.bind(this);
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
              url: response.data.image,
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
    phone: this.state.phone,
      address:this.state.address,
      image:this.state.url
    
    }

    console.log(user);

axios.put("http://localhost:3000/addUser/update/"+this.props.match.params.id, user)
      .then(res => console.log(res.data));

      window.location = '/Profile'
  }


  render(){
    return (

      <div>
        <Navbar_Login />
        <br />
        <div className = "container text-center">
        <form className="text-center border border-light p-9" >
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
          
                           <br></br>

           
            <br></br>
            <br></br>
        
            <br></br>
       
        <div className = "col">
                            <label>Image</label>
                            {/*  eslint-disable-next-line */}
                           <div  id='image' > <img src={this.state.url|| "http://via.placeholder.com/50*50"} alt="profile"
                              /></div> 
                           <input  type="file" onChange={this.handleChangeImage.bind(this)} className="btn btn-deep-orange darken-4" />
                           <button  onClick={this.handleUpload.bind(this)} className="btn btn-deep-orange darken-4">Upload</button>
                           </div>
        <button onClick={this.onSubmit} className="btn btn-deep-orange darken-4"  > edit account</button>
       
        </form>
        </div>
        <Footer />
        </div>
      
     
    )
}
}