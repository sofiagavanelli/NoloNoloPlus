import React from "react";
import { Card, ListGroup, ListGroupItem, Row, Col, Button, Alert } from 'react-bootstrap';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export function CardWorker(props){
    const [show, setShow] = React.useState(false);
    const [idDelete, setId]= React.useState('');

    function callAlert(id){
        setShow(true);
        setId(id);
    }

    function deleteWorker(){
        var del= 'https://site202133.tw.cs.unibo.it/worker/' + idDelete;
        fetch(del, {
            method: 'DELETE', 
        })
        setShow(false);
    }
    if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Sei sicuro di voler eliminare questo dipendente?</Alert.Heading>
            <hr />
            <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
                No
            </Button>
            <Button onClick={() => deleteWorker()} variant="outline-success">
                SI
            </Button>
            </div>
          </Alert>
        );
    }
    //Card key indica la chiave per identificare ogni singola card
    return(
       <div key={props.keyDiv} className={props.divName}>
            <Row xs={1} md={4} className="g-4">
            {
                props.info.map(worker =>(
                    <Col key={worker.user_id}>
                        <Card  style={{ margin: '10px' }}> 
                            <Card.Body>
                                <Card.Title>{worker.name} {worker.surname}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem><h6>Id dipendente:</h6> {worker.user_id}</ListGroupItem>
                                {worker.manager       
                                    ? <ListGroupItem><h6>Manager: </h6> Si</ListGroupItem>
                                    : <ListGroupItem><h6>Manager: </h6> No</ListGroupItem>      
                                }
                            </ListGroup>
                            <Button variant="danger" onClick={() =>callAlert(worker.user_id)}>Delete</Button>
                        </Card>
                    </Col>
                ))
            }
            </Row>
       </div> 
    );
}
