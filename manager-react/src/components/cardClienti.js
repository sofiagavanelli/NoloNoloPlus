import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";



export function CardClienti(props){
    let [infoClient, setInfo]=React.useState([]);//contiene le informazioni di ogni cliente
    let [numClientRent, setData]=React.useState(props.info);//contiene l'id del cliente e il numero di rent
    let [ordine, setOrd]=React.useState(props.ord);//useState per re-render child
    React.useEffect(()=>{
        //chiamata che ritorna le informazioni riguardanti i clienti
        console.log("render card");
        let app=[];
        fetch('http://localhost:8000/allClients')
        .then(results => results.json())
        .then(info => {
            for(var i in info){
                info[i].value=i;
                for(var j in numClientRent){
                    
                    if(info[i].client_id===numClientRent[j].clientId){
                        console.log("dentro if");
                        info[i].value=numClientRent[j].value;
                    }
                }
                //setInfo(clientInfo => [...clientInfo, info[i]]);aggiungo il nuovo oggetto in coda all'array hooks
                app.push(info[i]);
            }
            setInfo(app);
            console.log("dio cane");
            var tmp=infoClient;
            if(ordine==='decrescente'){
                tmp.value.sort(function(a, b){return b-a});
                setInfo(tmp);
                console.log("ordine decrescente");
            }else{
                if(ordine==='crescente'){
                    tmp.value.sort(function(a, b){return a-b});
                    console.log(tmp.client_id);
                    setInfo(tmp);
                    console.log("ordine crescente");
                }
            }
        });
    },[ordine, ]); 
    //Card key indica la chiave per identificare ogni singola card
    return(
       <div key={ordine} className='cardCli'>
            <Row xs={1} md={4} className="g-4">
            {
                infoClient.map(cliente =>(
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
            <h1>card clienti {ordine}</h1>
       </div> 
    );
}
