import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";



export function CardClienti(){
    let [clientData, setData]=React.useState([]);//array hooks che contiene i dati dei clienti
    //let [cardClienti, setCard]=React.useState([]);
    //var cliente;
  
    React.useEffect(() => {//il fetch viene eseguito solo dopo il primo render grazie al parametro '[]', però i dati vengono persi ogni volta che c'è un nuovo render
        setData([]);
        fetch('http://localhost:8680/allClients')
        .then(results => results.json())
        .then(data => {
            console.log(data);
            for(var i of data){
            let newData={client_id: i.client_id, name: i.name, surname: i.surname, img: i.img, address: i.address, place: i.place};
            setData(clientData => [...clientData, newData]);//aggiungo il nuovo oggetto in coda all'array hooks
            }
        });
    }, []);
    //Card key indica la chiave per identificare ogni singola card
    return(
       <div className='cardCli'>
            <Row xs={1} md={4} className="g-4">
            {
                clientData.map(cliente =>(
                    <Col key={cliente.client_id}>
                        <Card  style={{ margin: '10px' }}> 
                        <Card.Img variant="top" src={cliente.img} />
                        <Card.Body>
                            <Card.Title>{cliente.name} {cliente.surname}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><h6>client id:</h6> {cliente.client_id}</ListGroupItem>
                            <ListGroupItem><h6>address:</h6> {cliente.address}</ListGroupItem>
                            <ListGroupItem><h6>place:</h6> {cliente.place}</ListGroupItem>
                        </ListGroup>
                        </Card>
                    </Col>
                ))
            }
            </Row>
       </div> 
    );
}
