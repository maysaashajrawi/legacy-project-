import React, { Component } from 'react';
import axios from "axios";
import { storage } from "./firebase.js";



export default class EditItems extends Component {
  constructor(props) {
    super(props);

    //Defining the "this" in the functions using .bind method
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeimg = this.handleChangeImage.bind(this);
    this.onChangetype = this.onChangetype.bind(this);

    this.state = {
      itemName: "",
      category : "Women",
      description: "",
      type:"Jacket",
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
    axios.get('http://localhost:3000/addItems/'+this.props.match.params.id)

      .then(response => {
        this.setState({
          itemName: response.data.itemName,
          category: response.data.category,
          description: response.data.description,
          url: response.data.image,
          type: response.data.type,
        })  

      })
      .catch(function (error) {
        console.log(error);
      })
    }

  //List of category
  //Event Handlers:
  onChangeItemName(e) {
    this.setState({
      itemName: e.target.value
    });
  }

  onChangeCategory(e) {
    const { value } = e.target
    this.setState({
      category : value
    });
  }
  onChangetype(e){
    const { value } = e.target
    this.setState({
     type: value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  

  onSubmit(e) {
    e.preventDefault();
    const item = {
      itemName: this.state.itemName,
      category: this.state.category,
      description: this.state.description,
      type:this.state.type,
      image:this.state.url
    }

    console.log(item);

    axios.put("http://localhost:3000/addItems/update/"+this.props.match.params.id, item)
      .then(res => console.log(res.data));

      window.location = '/Profile'
  }

  render() {
    return (
        <div className = "container">

          <form className="text-center border border-light p-5" action="#!">

            <h3> "Only by giving are you able to receive more than you already have." -Jim Rohn </h3>

            <p className="h4 mb-4">Edit Your Item</p>

                <div className="col">
                <label>Item Name</label>
                <input 
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.itemName} 
                  onChange = {this.onChangeItemName}
                  text-align = "center"
                  // placeholder = "Insert Item Name"
                  />
                </div>

                <br />

                <div className="col">
                  <label>Select Category  </label>
                  <select
                    ref = "userInput"
                    required
                    className = "form-control"
                    value = {this.state.category}
                    onChange = {this.onChangeCategory}
                    >
                    <option value = "Women">Women</option>
                    <option value = "Men">Men</option>
                    <option value = "Kids">Kids</option>
                  </select>
                </div>

                <br />
                <div className = "type">
            <label>Select Type  </label>
            <select
              ref = "userInput"
              required
              className = "form-control"
              value = {this.state.type}
              onChange = {this.onChangetype}
              >
              <option value = "Shose">Shose</option>
              <option value = "Dress">Dress</option>
              <option value = "Jacket">Jacket</option>
              <option value = "Blouse">Blouse</option>
              <option value = "Gloves">Gloves</option>
              <option value = "Hat">Hat</option>
              <option value = "Scarf">Scarf</option>
            </select>
          </div> 
          <br />

                <div className = "col">
                  <label>Description  </label>
                  <input 
                    type = "text" 
                    className = "form-control" 
                    value = {this.state.description} 
                    onChange = {this.onChangeDescription}
                    placeholder = "Please insert a detailed description of your item and add its current condition"/>
                </div>

                <br />
               
                <div className = "col">
                            <label>Image</label>
                           <div  id='image' > <img src={this.state.url || "http://via.placeholder.com/50 50"} 
                            alt="firebase"  /></div> 
                           <input  type="file" onChange={this.handleChangeImage.bind(this)} className="btn btn-deep-orange darken-4" />
                           <button  onClick={this.handleUpload.bind(this)} className="btn btn-deep-orange darken-4">Upload</button>
                           </div>
                            <br />
        
        

                <div>
                <button onClick= {this.onSubmit}  className="btn btn-deep-orange darken-4">Edit</button>
                </div>
                </form>
     
        </div>
        
    )
  }
}