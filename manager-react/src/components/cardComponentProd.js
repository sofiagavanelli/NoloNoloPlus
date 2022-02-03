import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";



export function CardComponentProd(props){
    //Card key indica la chiave per identificare ogni singola card
    return(
       <div key={props.keyDiv} className={props.divName}>
            <Row xs={1} md={3} className="g-7" >
            {
                props.info.map(prodotto =>(
                    <Col key={prodotto._id}>
                        <Card  style={{ margin: '10px' }}> 
                        <Card.Img variant="top" src={prodotto.image} />
                        <Card.Body>
                            <Card.Title>{prodotto.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><h6>Id prodotto:</h6> {prodotto.prod_id}</ListGroupItem>
                            <ListGroupItem><h6>Brand:</h6> {prodotto.brand}</ListGroupItem>
                            <ListGroupItem><h6>Numero ospiti:</h6> {prodotto.guests}</ListGroupItem>
                            <ListGroupItem><h6>Anno prdouzione:</h6> {prodotto.year}</ListGroupItem>
                            <ListGroupItem><h6>Lunghezza:</h6> {prodotto.length}</ListGroupItem>
                            <ListGroupItem><h6>Velocità:</h6> {prodotto.speed}</ListGroupItem>
                            <ListGroupItem><h6>Prezzo alta stagione:</h6> {prodotto.high_season}</ListGroupItem>
                            <ListGroupItem><h6>Prezzo bassa stagione:</h6> {prodotto.low_season}</ListGroupItem>
                            <ListGroupItem><h6>Stato:</h6> {prodotto.status}</ListGroupItem>
                            <ListGroupItem><h6>Categoria:</h6> {prodotto.category}</ListGroupItem>
                        </ListGroup>
                        </Card>
                    </Col>
                ))
            }
            </Row>
       </div> 
    );
}