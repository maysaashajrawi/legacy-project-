import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom" ;
import axios from "axios";
import Footer from './Footer';

import Navbar_Login from "./Navbar_Login";

const ClothesItem = props => (
    <tr>
        <td>{props.item.itemName}</td>
        <td>{props.item.category}</td>
        <td>{props.item.type}</td>
        <td>{props.item.description}</td>
        <td>
        <img src= {props.item.image} width="200" height="200" class="w3-round" alt= "Image Item" className ="images-list" />
        </td>
        <td>
        <td>
       contact the donar on this number {props.item.phonenumber}
        </td>
        <td>
       
        </td>
            
            
      </td>
     
    </tr>
)

class ItemsList extends Component {

    constructor(props) {
        super(props);

       

        this.state = {
            items: [],
            filteredItems :[],
            SearchString:'',
            Category:'',
            filteredItems1:[],
            type:'',
            users:''
        }
    }
    

    componentDidMount() {
         axios.get("http://localhost:3000/addItems/")   
            .then( res => {
                this.setState({items: res.data})
            })
            .catch((error) => {
                console.log(error);
            })

           

    }

   
    itemsList() {
     
        let listedItems = (this.state.filteredItems.length > 0)? this.state.filteredItems : this.state.items;
        console.log(this.state.items)

        return listedItems.map(currentItem => {
            return <ClothesItem item = { currentItem } key = { currentItem._id }/>; 
        })
    } 

    onSearch = e => {
 let { items } = this.state
        let string = e.target.value
        console.log(string)
        if(string.length > 0){
            console.log(this.state.users)
           
           let filteredItems = items.filter(item => item.itemName.includes(string)||item.category.includes(string)
           || item.type.includes(string)||item.description.includes(string)
           )
           this.setState({SearchString:string,filteredItems:filteredItems})
        }
        else this.setState({SearchString:string,filteredItems:[]})
}

/// we will make a filter for our list of items
            onChangeCategory(e){
                var val = e.target.value
                let { items } = this.state
                this.setState({
                    Category:val,
                    type:''
                })

                let filteredItems = items.filter(item => item.category.includes(val))
               
                if (filteredItems.length>0){
                   this.setState({filteredItems:filteredItems})}
                   else{
                       filteredItems.push('we cannot find it')
                       this.setState({filteredItems: filteredItems })
                   }

            }

            onChangetype(e){
                var ty = e.target.value
                let { items } = this.state
                this.setState({
                   
                   type:ty
                })
               
                let filteredItems = items.filter(item => item.category.includes(this.state.Category) &&
                item.type.includes(ty) )
                
                if (filteredItems.length>0){
                   
                   this.setState({filteredItems:filteredItems})}
                   else{
                       filteredItems.push('we cannot find it')
                       this.setState({filteredItems: filteredItems })
                   }


            }

            Rest(){
                 
                   this.setState({
                       filteredItems:0,
                       Category:'',
                       type:''
                    
                })
   

            }
        

    render() {

        return (
            <div>
                <Navbar_Login/>
            <br />

            <div className = "container text-center border border-light p-9">
                <h2>Clothing</h2>
                <input name="search" className="form-control" onChange={this.onSearch.bind(this)} value={this.state.SearchString}  placeholder="Search for item Name"/>
                <table className = "table">

                <thead className = "thead">
                    <tr>
                    <th>Type</th>
                        <th> <select
                    ref = "userInput"
                    required="true"
                    className = "form-control"
                    value = {this.state.Category}
                    onChange = {this.onChangeCategory.bind(this)}
                    >
                         <option value = ""></option>
                    <option value = "Women">Women</option>
                    <option value = "Men">Men</option>
                    <option value = "Kids">Kids</option>
                  </select>
                        </th>
                        <th>Description</th>
                        <th> <select
                    ref = "userInput"
                    required="true"
                    className = "form-control"
                    value = {this.state.type}
                    onChange = {this.onChangetype.bind(this)}
                    >
                    <option value = ""></option>
                    <option value = "Shoes">Shoes</option>
                    <option value = "Dress">Dress</option>
                    <option value = "Jacket">Jacket</option>
                    <option value = "Blouse">Blouse</option>
                    <option value = "Gloves">Gloves</option>
                    <option value = "Hat">Hat</option>
                    <option value = "Scarf">Scarf</option>

                  </select>
                  </th> 
                  <th>
                  <button onClick={this.Rest.bind(this)}> Rest </button>
                  </th>
                        
                    </tr>
                </thead>




                <thead className = "thead">
                    <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>call</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {this.itemsList()}
                </tbody>
                </table>
            </div>
            <Footer />
            </div>
        )
    }
}

export default withRouter(ItemsList)
