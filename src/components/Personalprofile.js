import React from 'react';
import { storage } from "./firebase.js";
import axios from "axios";
import {  Link,withRouter } from "react-router-dom" ;
import Footer from './Footer';
import Navbar_Login from "./Navbar_Login"
    const Profileuser= props => (
  // <tr  >
  
   <div className = "user-profile">
    <div  className="container" >
      <div id="user-pro">
      <div className = "row">
        
        <div className = "col-md-4 col-sm-4 col-xs-12 " > <div style={{width:"220px" ,height:"220px"}} ><img src= {props.user.image} className = "img-responsive"/></div></div>
        <div className = "col-md-8 col-sm-4 col-xs-12">
         {/* <div>Hello our great donar </div>  */}
         <div className="name-class">
              <div className="na-1 col-md-4"><i class="icon-user"></i> <label>User Name:</label></div>
              <div className="na-1 col-md-4 name">{props.user.username}</div>
        </div>
         {/* <div>{props.user}</div> */}
         <div className="phone">
            <div className="ph col-md-4"><i className="icon-phone icon-large"></i>   <label> Phone:</label></div>
            <div className="ph col-md-4">{props.user.phone}</div>
         </div>
         <div className="address">
            <div className="add col-md-4"><i className="icon-map-marker icon-large"></i> <label>Address:</label></div>
            <div className="add col-md-4">{props.user.address}</div>
         </div>
         <div  style={{textAlign:"left"}} >
            <Link to ={"/edituser/"+props.user._id} style={{marginTop:"30px", fontFamily:"  serif" , background: "#d64949" }}  className="btn btn-deep-orange darken-4" >Edit User</Link>
          
          </div>
                   </div>

     
     
     
    
    
     

        
      </div>

      </div>
   
      </div>
  </div>
  // </tr>
)


const Profileitems= props => (
  <tr>
    
      <td>{props.item.itemName}</td>
      <td>{props.item.category}</td>
      <td>{props.item.type}</td>
      <td>{props.item.description}</td>
      <img src= {props.item.image} width='50' height='50' alt="Profile-image"/>
    
      
      
       <td> 
      <Link to ={"/edit/"+props.item._id} className="btn btn-deep-orange darken-4" >Edit item</Link>
      <button type = "button" 
      className="btn btn-deep-orange darken-4"
      onClick = {() => {props.deleteItem(props.item._id)}}> Delete Item
      </button>
      </td> 
  </tr>
)




class Personalprofile extends React.Component {
    constructor(props) {
      super(props);
      this.deleteUser = this.deleteUser.bind(this);
      this.state = {
        users:[],
        Data:[],
        userName:[],
        image:null,
        url :'',
        progress:0,
        Info:[],
      items:[],
           };
    
    }
    componentDidMount() {
      axios.get("http://localhost:3000/addUser/")   
         .then( res => {
             this.setState({users : res.data})
             console.log(res.data)
           
         })
         .catch((error) => {
             console.log(error);
         });

         axios.get("http://localhost:3000/addItems/")   
         .then( res => {
           var newitems=[]
           for(var i =0 ; i< res.data.length;i++){
             if(res.data[i].userName === localStorage.getItem('username')){
                newitems.push(res.data[i])
             }
           }
          
             this.setState({items: newitems})
             console.log(this.state.items)
         })
         .catch((error) => {
             console.log(error);
         })
 }
 deleteUser(id) {
  axios.delete("http://localhost:3000/addUser/" + id)    /// sent this req to the middleware in the index.js server
      .then(res => console.log(res.data));
  this.setState({
      users: this.state.users.filter(el => el._id !== id)
  })
  window.localStorage.clear()
  window.location = '/'
}


deleteItem(id) {
  axios.delete("http://localhost:3000/addItems/" + id)
      .then(res => console.log(res.data));
 
  window.location = '/Profile'
}




 usersList() {
  let listedusers = (this.state.Data.length >0)? this.state.data :this.state.users;

  return listedusers.filter(elet=> localStorage.getItem('username') === elet.username).map(currentUser => {
    return <Profileuser user= { currentUser } deleteUser = { this.deleteUser} key = { currentUser._id }/>; 
  })
} 

itemsList() {
  let listeditem = this.state.items;

  return listeditem.map(currentItem => {
    return <Profileitems item= { currentItem } deleteItem= { this.deleteItem} key = { currentItem._id }/>; 
  })
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
  
             render() {
                return (
                  <div>

                  <Navbar_Login/>
                  <div className="text-center" > <div className = "col"   >
                           
                          
                        
                        
                         

                           <div  className="text-center">{this.usersList()}
                           
                           
                           
                           <table className = "table">
               
               <tbody>
       
                  
               </tbody>
               <thead className = "thead">
                   <tr>
                       <th>itemName</th>
                       <th>category</th>
                       <th>Phone</th>
                       <th>description</th>
                       <th>image</th>
                   </tr>
               </thead>
               <tbody>
                 
                   {this.itemsList()}
                  
               </tbody>
               

              </table>
                           
                           
                           
                           </div>
             
                  
                   
               </div>
                            <br />
                           
                    <Footer />
                  </div>
                  </div>  
                )
              }
            }
            
            export default withRouter(Personalprofile)

















