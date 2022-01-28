import "../App.css";
import {BarCharT} from '../components/barChart';
import {CardComponentClient} from '../components/cardComponentClient';
import React from "react";
/*  import {FilterButton} from '../components/filterButton';  */
//import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
var _ = require('lodash');



function Clienti() {
  const [numClientRent, setData]=React.useState([]);//contiene l'id del cliente e il numero di rent
  const [valueClientRent, setValue]= React.useState([]);//contiene il ricavato totale dei noleggi per ogni cliente
  const [infoClient, setInfo]=React.useState([]);//contiene le informazioni di ogni cliente
  
  //funzione che ritorna le informazioni di tutti i noleggi e calcola il numero di noleggi per ogni cliente
  function getNumRent(){
    fetch('http://localhost:8000/allRents')
      .then(results => results.json())
      .then(data => {
        //contare il numero di noleggi senza lodash
        /* const name = data //filtra i duplicati
          .map(dataItem => dataItem.prod_id) 
          .filter((prod_id, index, array) => array.indexOf(prod_id) === index);

        const counts = name //conta il numero di noleggi per ogni cliente
         .map(prod_id => ({
           prod_id: prod_id,
           value: data.filter(item => item.prod_id === prod_id).length//.filter crea un nuovo array con solo gli oggetti che hanno lo stesso id e restituisce la lunghezza dell'array
         }));
        setData(counts); */

        setData( _.chain(data)//creao un oggetto che contiene il client id e il numero di noleggi
        .groupBy("client_id")
        .map((value, key) => ({client_id: key, value: value.length})) 
        .value()
        );
        getValue(data);
      });
  }

  //funzione che ritorna le informazioni dei clienti
  function getInfo(){
        fetch('http://localhost:8000/allClients')
        .then(results => results.json())
        .then(info => {
          setInfo(info);
        });
  }

  //funzione che calcola la spesa di ogni cliente
  function getValue(data){
    const rentForClient=
      _.chain(data)//creao un oggetto che contiene il client id e tutti i suoi noleggi 
      .groupBy("client_id")
      .map((value, key) => ({client_id: key, rents: value}))  //per avere il numero di noleggi basta sostituire con 'rents: value.lenght'
      .value();
    let valueRent=[];
    for(var i of rentForClient){
      valueRent.push({client_id: i.client_id, value: 0});
    }
    
    for(var i in rentForClient){
      var tot=0;
      for(var j in rentForClient[i].rents){
        if(rentForClient[i].rents[j].approved){//manca da controllare se il noleggio è finito
          tot+=rentForClient[i].rents[j].price;
        }
        valueRent[i].value = tot; 
      }
    }
    setValue(valueRent);
  }
 
  React.useEffect(() => {//il fetch viene eseguito solo dopo il primo render grazie al parametro '[]', però i dati vengono persi ogni volta che c'è un nuovo render, per questo uso array hooks
    getNumRent();
    getInfo();
  }, []);

    return (
      <div id="clienti">
        <h1>Customers Statistics</h1>
        <h5>Number of rent for Customers</h5>
        <BarCharT dati={numClientRent} name={"numero di noleggi per cliente"} etichetta={"clientId"}/>
        <h5>Fatturato per ogni cliente</h5>
        <BarCharT dati={valueClientRent} name={"fatturato per ogni cliente"}/>
        <h1>Customers data</h1>
        
        <CardComponentClient info={infoClient} divName={"cardCliDiv"} keyDiv={"cardclienti"}/>
      </div>
    );
}

export default Clienti;
