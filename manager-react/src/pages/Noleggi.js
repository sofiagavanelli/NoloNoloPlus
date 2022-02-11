import "../App.css";
import {BarCharT} from '../components/barChart';
import {PieCharT} from '../components/pieChart';
import {DoublePieCharT} from '../components/doublePieChart';
import {CardComponentProd} from '../components/cardComponentProd';
import {CardComponentRent} from '../components/cardComponentRent';
import React from "react";
import { Button, ButtonGroup } from 'react-bootstrap';
var _ = require('lodash');

function Noleggi() {
  const [countApproved, setApproved]=React.useState([]);
  const [countState, setState]=React.useState([]);
  const [rentMonth, setMonth]=React.useState([]);
  const [infoRent, setInfo]=React.useState([]);

  //funzione che calcola quanti noleggi sono approvati e quanti no
  function getApprovati(data){
    let approvati=[{name: "approvati", value: 0, fill: '#8884d8'}, {name: "non approvati", value: 0, fill: '#8dd1e1'}];
    for(var i in data){//calcolo  quanti noleggi sono stati approvati e quanti no
      if(data[i].approved){
        approvati[0].value++;
      }else{
        approvati[1].value++;
      }
    }
    setApproved(approvati);
  }

  //funzione che ritorna il numero di noleggi conclusi, in corso o non ancora iniziati
  function getStatus(data){
    let today=new Date();
    let stato=[{name: "conclusi", value: 0}, {name: "in corso", value: 0}, {name: "non ancora iniziati", value: 0}];
    for(var i in data){
      let dataEnd=new Date(data[i].end_date);
      let dataStart= new Date(data[i].start_date);
      const difStart=dataStart - today;
      const difEnd=dataEnd - today;
      if(data[i].approved){
        if(difEnd<0){//se il noleggio è concluso
          stato[0].value++;
        }else{//Se iniziato ma non finito
          if(difEnd>0 && difStart<0){
            stato[1].value++;
          }else{//non ancora iniziati
            stato[2].value++;
          }
        }
      }
    }
    setState(stato);
  }

  function countMonthRent(data){
    let monthRent=[];
    const month = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
    var i, app;
    for(i=0; i<12; i++){
      monthRent.push({month: i, value: 0, count: 0});
    }
    for(i in data){
      if(data[i].approved){
        let dataEnd=new Date(data[i].end_date);
        app=dataEnd.getMonth();
        monthRent[app].count++;
        monthRent[app].value=monthRent[app].value + data[i].price;
        monthRent[app].value=_.toNumber(monthRent[app].value)
      }
    }
    for(i in monthRent){
      monthRent[i].month=month[i];
    }
    setMonth(monthRent);
  }
  //funzione che ritorna i noleggi
  function getRent(){
    fetch('https://site202133.tw.cs.unibo.it/allRents')
      .then(results => results.json())
      .then(data => {
        setInfo(data);
        getApprovati(data);
        getStatus(data);
        countMonthRent(data);
      });
  }

  React.useEffect(() =>{
    getRent();
  }, []);


    return (
      <div id="noleggi">
        <h1 id="arcobaleno">Noleggi</h1>
        <h5>Stato dei noleggi</h5>
        <PieCharT dati={countApproved} ></PieCharT>
        <BarCharT dati={countState} name={"stato dei noleggi"} xValue={"name"} yValue={"value"}/>
        <hr  style={{
            color: 'red',
            backgroundColor: 'red',
            height: 5
        }}/>
        <h5 style={{ textAlign: 'center'}}>Numero di noleggi per mese</h5>
        <BarCharT dati={rentMonth} name={"Numero di noleggi"} xValue={"month"} yValue={"count"}/>
        <hr  style={{
            color: 'red',
            backgroundColor: 'red',
            height: 5
        }}/>
        <h5  style={{ textAlign: 'center'}}>Ricavo noleggi per mese</h5>
        <BarCharT dati={rentMonth} name={"Ricavo noleggi"} xValue={"month"} yValue={"value"}/>
        <hr  style={{
            color: 'red',
            backgroundColor: 'red',
            height: 5
        }}/>
        <h4 style={{ textAlign: 'center'}}>Informazioni sui noleggi</h4>
        <CardComponentRent info={infoRent} divName={"cardRent"} keyDiv={"cardRent"}></CardComponentRent>
      </div>
      );
}

export default Noleggi;
