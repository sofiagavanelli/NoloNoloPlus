import React from "react";
import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  Link } from "react-router-dom";
import Cliente from "../pages/Cliente";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';





export function CardComponentClient(props){

    //Card key indica la chiave per identificare ogni singola card
    return(
        
       <div key={props.keyDiv} className={props.divName}>
            <Row xs={1} md={4} className="g-4">
            {
                props.info.map(cliente =>(
                    <Col key={cliente.client_id}>
                        <Card  style={{ margin: '10px' }}> 
                        <Card.Img variant="top" src={cliente.image} />
                        <Card.Body>
                            <Card.Title><Link to="/cliente">{cliente.name} {cliente.surname}</Link></Card.Title>
                            <Routes>
                                <Route exact path="/cliente" component={Cliente} info={cliente}/>          
                            </Routes>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><h6>client id:</h6> {cliente.client_id}</ListGroupItem>
                            <ListGroupItem><h6>Indirizzo:</h6> {cliente.address}</ListGroupItem>
                            <ListGroupItem><h6>Città:</h6> {cliente.place}</ListGroupItem>
                            <ListGroupItem><h6>Numero di noleggi:</h6> {cliente.number}</ListGroupItem>
                            <ListGroupItem><h6>Ricavi noleggi:</h6> {cliente.value}</ListGroupItem>
                        </ListGroup>
                        </Card>
                    </Col>
                ))
            }
            </Row>
       </div> 
    );
}
