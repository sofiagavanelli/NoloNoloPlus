import "../App.css";
import {BarCharT} from '../components/barChart';
import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import {CardClienti} from '../components/cardClienti';
import React from "react";
/*  import {FilterButton} from '../components/filterButton';  */
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function Clienti() {
  let [numClientRent, setData]=React.useState([]);//contiene l'id del cliente e il numero di rent
  let [valueClientRent, setValue]= React.useState([]);//contiene il ricavato totale dei noleggi per ogni cliente
  let [infoClient, setInfo]=React.useState([]);//contiene le informazioni di ogni cliente
  let [infoRent, setRent]= React.useState([]);//contiene le informazioni di ogni noleggio
  
  //chiamata che ritorna le informazioni di tutti i noleggi per ricavare il numero di noleggi per cliente
  function getNumRent(){
    setData([]);
    fetch('http://localhost:8000/allRents')
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
      });
  }


  function getInfo(){
    console.log("render card");
        fetch('http://localhost:8000/allClients')
        .then(results => results.json())
        .then(info => {
          setInfo(info);
            /* for(var i in info){
                info[i].value=0;
                for(var j in numClientRent){
                    if(info[i].client_id===numClientRent[j].clientId){
                        console.log("dentro if");
                        info[i].value=numClientRent[j].value;
                    }
                }
                //setInfo(clientInfo => [...clientInfo, info[i]]);aggiungo il nuovo oggetto in coda all'array hooks
                app.push(info[i]);
            } 
            setInfo(app);*/
        });
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

     /*  let data1=new Date();
      let data2=new Date();
      data1=infoRent[i].end_date;
      data2= Date.now();//restituisce la data di oggi in millesecondi
      data2=data2.toISOString();//restituisce la data formattata */
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
          /* for(var j in valueRen){
            if(valueRen[j].client_id===infoRent[i].client_id){
              trovato=j;
            }
          } */

        }
      }
      
    }
    console.log("valueRen");
    setValue(valueRen);
    valueClientRent.map(ren =>{
      return console.log({ren});
    })

  }
  React.useEffect(() => {//il fetch viene eseguito solo dopo il primo render grazie al parametro '[]', però i dati vengono persi ogni volta che c'è un nuovo render, per questo uso array hooks
    console.log("render");
    getNumRent();
    getInfo();
    getValue();
  }, []);

    return (
      <div id="clienti">
        <h1>Customers Statistics</h1>
        <h5>Number of rent for Customers</h5>
        <BarCharT dati={numClientRent} name={"number of rent for customers"} etichetta={"clientId"}/>
        <h5>value of rent for Customers</h5>
        <BarCharT data={valueClientRent} name={"value of rent for customers"}/>
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
/* 
<div id="filter">
          <DropdownButton
              variant="outline-secondary"
              title="ordina per numero di noleggi"
              id="input-group-dropdown-2"
              align="end"
              >
          <Dropdown.Item href="#" onClick={() => setOrd('crescente')}>crescente</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() => setOrd('decrescente')}>Decrescente</Dropdown.Item>
          </DropdownButton>
        </div> */


export default Clienti;
