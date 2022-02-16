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
        let today=new Date();
        console.log("today: ");
        console.log(today);
        const rentForWorker=
          _.chain(data)//creao un oggetto che contiene il client id e tutti i suoi noleggi 
          .groupBy("worker_id")
          .map((value, key) => ({worker_id: key, rents: value}))  //per avere il numero di noleggi basta sostituire con 'rents: value.lenght'
          .value();
        let valueRent=[];
        for(var i of rentForWorker){//inizializza i valori
          valueRent.push({worker_id: i.worker_id, value: 0, number: 0});
        }
        for(i in rentForWorker){//calcola il totale e il numero di noleggi
          let num=0;
          var tot=0;
          for(var j in rentForWorker[i].rents){
            let dataEnd=new Date(rentForWorker[i].rents[j].end_date);
            const difEnd=dataEnd - today;
            if(rentForWorker[i].rents[j].approved && difEnd<0){
              tot=tot + rentForWorker[i].rents[j].price;
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
        fetch('https://site202133.tw.cs.unibo.it/allWorker')
        .then(results => results.json())
        .then(info => {
          setInfo(info);
          for(var i of info){
            let index=_.findIndex(valueRent, {'worker_id': i.user_id });
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
            valueRent.push({worker_id: id, value: i.value, number: i.number });
          }
          setValue(valueRent);
        });
  }

  React.useEffect(() =>{
     getNumRent();
    }, []);

  return (
    <div id="dipendenti">
        <h1 id="arcobaleno" >Statistiche degli impiegati</h1>
        <hr  style={{
          color: 'red',
          backgroundColor: 'red',
          height: 5
        }}/>
        <BarCharT dati={valueDipRent} name={"numero di noleggi per impiegato"} xValue={"worker_id"} yValue={"number"}/>
 
        <BarCharT dati={valueDipRent} name={"fatturato per ogni impiegato"} xValue={"worker_id"} yValue={"value"}/>
        <hr  style={{
          color: 'red',
          backgroundColor: 'red',
          height: 5
        }}/>
        <h2 id="arcobaleno">Informazioni dipendenti</h2>
        <CardWorker info={infoWorker} keyDiv={"cardDipendenti"} divName={"cardDipDiv"}></CardWorker>
    </div>
    );
}

export default Dipendenti;
