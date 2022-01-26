import "../App.css";
import {BarChartClient} from '../components/barChartClient';
import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import {CardClienti} from '../components/cardClienti';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



function Clienti() {
  let [numClientRent, setData]=React.useState([]);//contiene l'id del cliente e il numero di rent
  let [valueClientRent, setValue]= React.useState([]);//contiene il ricavato totale dei noleggi per ogni cliente
  let [infoClient, setInfo]=React.useState([]);//contiene le informazioni di ogni cliente
  let [infoRent, setRent]= React.useState([]);//contiene le informazioni di ogni noleggio
  
  //chiamata che ritorna le informazioni di tutti i noleggi per ricavare il numero di noleggi per cliente
  async function getNumRent(){
    /* fetch('http://localhost:8000/allRents')
      .then(results => results.json())
      .then(data => {
        setRent(data);
        console.log("rent"+infoRent);
        console.log(data);
        const name = data //filtra i duplicati
          .map(dataItem => dataItem.client_id) 
          .filter((client_id, index, array) => array.indexOf(client_id) === index);

        const counts = name //conta il numero di noleggi per ogni cliente
         .map(client_id => ({
           clientId: client_id,
           value: data.filter(item => item.client_id === client_id).length//.filter crea un nuovo array con solo gli oggetti che hanno lo stesso id e restituisce la lunghezza dell'array
         }));
        setData(counts);
      }); */
    
    const response = await fetch('http://localhost:8000/allRents');
    const data = await response.json();
    return data;
  }


  async function getInfo(){
    const response = await fetch('http://localhost:8000/allClients')
    const info = await response.json();
   return info;   
  }

  function getValue(){
    let valueRen=[];
    let trovato=-1;
    console.log("info rent");
    infoRent.map(ren =>{
      return console.log({ren});
    })
    for(var i in infoRent){
      console.log("dio cane");

      console.log(infoRent[i].approved);
      if(infoRent[i].approved===true /* && (data2>data1) */){//se il noleggio è stato approvato ed è anche finito
        if(valueRen.length===0){
          let app={client_id: infoRent[i].client_id, tot: infoRent[i].price};
          valueRen.push(app);
        }else{
          trovato=valueRen.find(ren => ren.client_id===infoRent[i].client_id);
          if(trovato===undefined){
            let app={client_id: infoRent[i].client_id, value: infoRent[i].price};
            valueRen.push(app);
          }else{
            valueRen[trovato].value+=infoRent[i].price;
          }

        }
      }
      
    }
    console.log("valueRen");
    setValue(valueRen);
    valueClientRent.map(ren =>{
      return console.log({ren});
    })

  }

  this.getNumRent().then(data =>{
    setRent(data);
    const name = data //filtra i duplicati
    .map(dataItem => dataItem.client_id) 
    .filter((client_id, index, array) => array.indexOf(client_id) === index);

    const counts = name //conta il numero di noleggi per ogni cliente
    .map(client_id => ({
        clientId: client_id,
        value: data.filter(item => item.client_id === client_id).length//.filter crea un nuovo array con solo gli oggetti che hanno lo stesso id e restituisce la lunghezza dell'array
    }));
    setData(counts);
    getInfo();
  });

  this.getInfo().then()(info =>{
    setInfo(info);
    console.log("info");
    console.log(info);
    getValue();
  });

  React.useEffect(() => {//il fetch viene eseguito solo dopo il primo render grazie al parametro '[]', però i dati vengono persi ogni volta che c'è un nuovo render, per questo uso array hooks
    console.log("render");
    getNumRent();
  }, []);

    return (
      <div id="clienti">
        <h1>Customers Statistics</h1>
        <h5>Number of rent for Customers</h5>
        <BarChartClient dati={numClientRent} />
        <h5>value of rent for Customers</h5>
        <BarChartClient data={valueClientRent} />
        <h1>Customers data</h1>
        
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
                        </ListGroup>
                        </Card>
                    </Col>
                ))
            }
            </Row>
      </div>
    );
}


/* {
  infoRent.map(info =>{
    return <h1>{app}</h1>
  })
}  */ 


export default Clienti;
