import {BarCharT} from '../components/barChart';
//import {CardComponentClient} from '../components/cardComponentClient';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { CardWorker } from '../components/cardWorker';

var _ = require('lodash');


function Dipendenti() {
  const [numDipRent, setData]=React.useState([]);
  const [valueDipRent, setValue]= React.useState([]);
  const [infoWorker, setInfo]=React.useState([]);
    
  function getNumRent(){
    fetch('https://site202133.tw.cs.unibo.it/allRents')
      .then(results => results.json())
      .then(data => {
        setData( _.chain(data)//creao un oggetto che contiene il client id e il numero di noleggi
        .groupBy("worker_id")
        .map((value, key) => ({worker_id: key, value: value.length})) 
        .value()
        );
        getValue(data);
      });
  }

  function getWorkerInfo(){
    fetch('https://site202133.tw.cs.unibo.it/allWorker')
      .then(results => results.json())
      .then(workers => {
        setInfo(workers);
      });
  }


  function getValue(data){
    const rentForDip=
      _.chain(data)//creao un oggetto che contiene il client id e tutti i suoi noleggi 
      .groupBy("worker_id")
      .map((value, key) => ({worker_id: key, rents: value}))  //per avere il numero di noleggi basta sostituire con 'rents: value.lenght'
      .value();
    let valueRent=[];
    for(var i of rentForDip){
      valueRent.push({worker_id: i.worker_id, value: 0});
    }
    
    for(var i in rentForDip){
      var tot=0;
      for(var j in rentForDip[i].rents){
        if(rentForDip[i].rents[j].approved){//manca da controllare se il noleggio è finito
          tot+=rentForDip[i].rents[j].price;
        }
        
      }
      valueRent[i].value = tot; 
    }
    console.log(valueRent);
    setValue(valueRent);
  }

  React.useEffect(() =>{
     getNumRent();
     getWorkerInfo();
    }, []);

  return (
    <div id="dipendenti">
        <h1 id="arcobaleno">Statistiche degli impiegati</h1>
        <h5>Numero di noleggi per impiegato</h5>
        <BarCharT dati={numDipRent} name={"numero di noleggi per impiegato"} xValue={"worker_id"} yValue={"value"}/>
        <h5>Fatturato per ogni dipendente</h5>
        <BarCharT dati={valueDipRent} name={"fatturato per ogni impiegato"} xValue={"worker_id"} yValue={"value"}/>
        <hr  style={{
                      color: 'red',
                      backgroundColor: 'red',
                      height: 5
        }}/>
        <h5>Informazioni dipendenti</h5>
        <CardWorker info={infoWorker} keyDiv={"cardDipendenti"} divName={"cardDipDiv"}></CardWorker>
    </div>
    );
}

export default Dipendenti;
