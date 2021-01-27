import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
export default class Cards extends Component {
    render() {
        return(
            <div className = "container">
                <CardDeck className = "text-center d-flex justify-content-between">
                <Card>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + "./Images/DonateNow.png"} rel="noopener noreferrer" alt="noopener noreferrer" />
                    <Card.Body>
                    <Card.Text>
                        Help us bring DAFAH to others by helping us achieve our goal and reach everyone across the country!
                        Your help on our quest is only a button away, so click below!
                        <b>Please note that you have to sign up, log in, and then add an item </b>
                    </Card.Text>                
                    <button className = "btn btn-dark" style={{background: "#000"}} 
                    onClick =  {() =>{if (localStorage.length >= 1){
                        window.location = '/AddItems'
                      }
                       else if (localStorage.length < 1){
                        window.location = '/login'
                      }}}>Donate Your Item</button>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + "./Images/AboutUs.png"} rel="noopener noreferrer" alt="noopener noreferrer" />
                    <Card.Body>
                    <Card.Text>
                    DAFAH. A charity organization aimed towards creating a
                    direct connection between the donor and the organization
                    whereas anyone can open the website, create an account and simply
                    submit a form with the item that they want to donate. We will then
                    contact them to pick up the item to take it to its new home. 
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + "./Images/Contributors.png"} rel="noopener noreferrer" alt="noopener noreferrer"/>
                    <Card.Body>
                    <Card.Text>
                    Address
                    <br />
                    Al- Sha'ab St. 29, Al-Jandaweel, Amman, Jordan 
                    <br /> <br />
                    Phone 
                    <br /> 
                    <a href="tel:+962 7 980 7680">Call us at +962 7 980 7680</a>
                    <br />
                    <a href="tel:+962 7 800 7680">Call us at +962 7 800 7680</a>
                    <br /><br />
                    E-mail 
                    <br />
                    <a href = "mailto:dafah.organization@dafah.com">dafah.organization@dafah.com</a>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
                </CardDeck>
            </div>   
        )
    }
}

