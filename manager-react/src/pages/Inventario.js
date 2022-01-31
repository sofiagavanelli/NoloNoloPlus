import "../App.css";
import {BarCharT} from '../components/barChart';
import {CardComponentProd} from '../components/cardComponentProd';
import React from "react";
var _ = require('lodash');


function Inventario() {
    const [numClientRent, setData]=React.useState([]);//contiene l'id del prodotto e il numero di rent
    const [valueProdRent, setValue]= React.useState([]);//contiene il ricavato totale dei noleggi per ogni prodotto
    const [infoProd, setInfo]=React.useState([]);//contiene le informazioni di ogni prodotto
    function getNumRent(){
      fetch('http://localhost:8000/allRents')
      .then(results => results.json())
      .then(data => {
        setData( _.chain(data)
        .groupBy("prod_id")
        .map((value, key) => ({prod_id: key, value: value.length})) 
        .value()
        );
        getValue(data);
      });
    }
    

    function getValue(data){
      let valueRent=[];
      const rentForProd=
      _.chain(data)
      .groupBy("prod_id")
      .map((value, key) => ({prod_id: key, rents: value})) 
      .value();
      //console.log(rentForProd);
      for(var i of rentForProd){
        valueRent.push({prod_id: i.prod_id, value: 0});
      }
      
      for(var i in rentForProd){
        var tot=0;
        for(var j in rentForProd[i].rents){
          if(rentForProd[i].rents[j].approved){//manca da controllare se il noleggio è finito
            tot+=rentForProd[i].rents[j].price;
          }
          valueRent[i].value = tot; 
        }
      }
      setValue(valueRent);
    }

    function getInfo(){
      fetch('http://localhost:8000/prods')
        .then(results => results.json())
        .then(info => {
          setInfo(info);
        });
    }

    React.useEffect(() =>{
      getNumRent();
      getInfo();
    }, []);

    return (
      <div id="inventario">
        <h1>Statistiche inventario</h1>
        <h5>Numero di noleggi per prodotto</h5>
        <BarCharT dati={numClientRent} name={"numero di noleggi per prodotto"} etichetta={"prod_id"}/>
        <h5>Fatturato per ogni prodotto</h5>
        <BarCharT dati={valueProdRent} name={"fatturato per ogni prodotto"} etichetta={"prod_id"}/>
        <h2>Informazioni prodotti</h2>
        <CardComponentProd info={infoProd} divName={"cardProdDiv"} keyDiv={"cardProd"}/>
      </div>
      );
}

export default Inventario;
