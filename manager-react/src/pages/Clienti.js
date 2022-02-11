import "../App.css";
import {BarCharT} from '../components/barChart';
import {CardComponentClient} from '../components/cardComponentClient';
import React from "react";
/*  import {FilterButton} from '../components/filterButton';  */
//import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
var _ = require('lodash');



function Clienti(props) {
  const [valueClientRent, setValue]= React.useState([]);//contiene il ricavato totale e il numero dei noleggi per ogni cliente
  const [infoClient, setInfo]=React.useState([]);//contiene le informazioni di ogni cliente
  
  //funzione che ritorna le informazioni di tutti i noleggi e calcola il numero di noleggi per ogni cliente
  function getNumRent(){
    fetch('https://site202133.tw.cs.unibo.it/allRents')
      .then(results => results.json())
      .then(data => {
        const rentForClient=
          _.chain(data)//creao un oggetto che contiene il client id e tutti i suoi noleggi 
          .groupBy("client_id")
          .map((value, key) => ({client_id: key, rents: value}))  //per avere il numero di noleggi basta sostituire con 'rents: value.lenght'
          .value();
        let valueRent=[];
        for(var i of rentForClient){//inizializza i valori
          valueRent.push({client_id: i.client_id, value: 0, number: 0});
        }
        
        for(i in rentForClient){//calcola il totale e il numero di noleggi
          let num=0;
          var tot=0;
          for(var j in rentForClient[i].rents){
            
            if(rentForClient[i].rents[j].approved){//manca da controllare se il noleggio è finito
              tot=tot + rentForClient[i].rents[j].price;
              num++;
            }
            valueRent[i].value = _.toNumber(tot);
            valueRent[i].number = num;
          }
        }
        getInfo(valueRent); 
      });
  }

  //funzione che ritorna le informazioni dei clienti
  function getInfo(valueRent){
        fetch('https://site202133.tw.cs.unibo.it/allClients')
        .then(results => results.json())
        .then(info => {
          setInfo(info);
          for(var i of info){
            let index=_.findIndex(valueRent, {'client_id': i.client_id });
            if(index===-1){
              i.value=0;
              i.number=0;
            }else{
              i.value=valueRent[index].value;
              i.number=valueRent[index].number;
            }
          }
          valueRent=[];
          for(var i of info){
            let id=i.name + " " + i.surname ;
            valueRent.push({client_id: id, value: i.value, number: i.number });
          }
          setValue(valueRent);
        });
  }
  props.func('prova');
  
  React.useEffect(() => {//il fetch viene eseguito solo dopo il primo render grazie al parametro '[]', però i dati vengono persi ogni volta che c'è un nuovo render, per questo uso array hooks
    getNumRent();
  }, []);

    return (
      <div id="clienti">
        <h1 id="arcobaleno">Statistiche clienti</h1>
        
        <h5>Numero di noleggi per cliente</h5>
        <BarCharT dati={valueClientRent} name={"numero di noleggi per cliente"} xValue={"client_id"} yValue={"number"}/>
        
        <h5>Fatturato per ogni cliente</h5>
        <BarCharT dati={valueClientRent} name={"fatturato per ogni cliente"} xValue={"client_id"} yValue={"value"}/>
        
        <h1>Dati clienti</h1>
        <CardComponentClient info={infoClient} divName={"cardCliDiv"} keyDiv={"cardclienti"}/>
      </div>
    );
}

export default Clienti;
