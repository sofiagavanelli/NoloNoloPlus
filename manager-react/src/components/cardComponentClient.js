import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";



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
                            <Card.Title>{cliente.name} {cliente.surname}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><h6>client id:</h6> {cliente.client_id}</ListGroupItem>
                            <ListGroupItem><h6>address:</h6> {cliente.address}</ListGroupItem>
                            <ListGroupItem><h6>place:</h6> {cliente.place}</ListGroupItem>
                            <ListGroupItem><h6>number of rent:</h6> {cliente.value}</ListGroupItem>
                        </ListGroup>
                        </Card>
                    </Col>
                ))
            }
            </Row>
       </div> 
    );
}
