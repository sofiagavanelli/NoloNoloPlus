import "../App.css";
import {BarCharT} from '../components/barChart';
import {PieCharT} from '../components/pieChart';
import {CardComponentProd} from '../components/cardComponentProd';
import React from "react";
import { Button, ButtonGroup } from 'react-bootstrap';
var _ = require('lodash');


function Inventario() {
    const [valueProdRent, setValue]= React.useState([]);
    const [valueCategoryRent, setCategory]= React.useState([]);
    const [infoProd, setInfo]=React.useState([]);
    const [statusProd, setStatus]=React.useState([]);
    const [numProd, setNum]=React.useState([]);
    const [isShow, setIsShow] = React.useState(true);//se è true vengono visualizzati i singoli prodotti, se è false vengono visualizzate le categorie
    const color=['#8884d8', '#8dd1e1', '#d0ed57', '#ffc658'];
    
    //funzione che restituisce tutti i noleggi
    function getRent(){
      fetch('http://localhost:8000/allRents')
      .then(results => results.json())
      .then(data => {
        getValueProduct(data);//chiamo funzione per calcolare il numero di noleggi e il costo dei noleggi per ogni prodotto 
      });
    }
    
    //funzione che calcola sia il numero di noleggi sia il valore dei noleggi per ogni prodotto
    function getValueProduct(data){
      let today=new Date();
      const rentForProd=
      _.chain(data)//creo un oggetto che contiene il prod id e tutti i suoi noleggi 
      .groupBy("prod_id")
      .map((value, key) => ({prod_id: key, rents: value}))  //per avere il numero di noleggi basta sostituire con 'rents: value.lenght'
      .value();
      let valueRent=[];
      for(var i of rentForProd){//inizializza i valori
        valueRent.push({prod_id: i.prod_id, value: 0, number: 0});
      }
      for(i in rentForProd){//calcola il totale e il numero di noleggi
        let num=0;
        var tot=0;
        for(var j in rentForProd[i].rents){
          let dataEnd=new Date(rentForProd[i].rents[j].end_date);
          const dif=dataEnd - today;
          if(rentForProd[i].rents[j].approved && dif<0){//controllo se il noleggio è stato approvato ed è anche finito
            tot=tot + rentForProd[i].rents[j].price;
            num++;
          }
          valueRent[i].value = _.toNumber(tot);
          valueRent[i].number = num;
        }
      }
      getInfo(valueRent);//richiamo la funzione per inserire i valori calcolati su ogni prodotto
    }

    function getValueCategory(rentForCategory, valueRent){
      let valueCategory=[];
      for(var i in rentForCategory){
        valueCategory.push({category: rentForCategory[i].category, value:0, number: 0});
      }
      for(var i in valueRent){//scorro tutti i noleggi
        let index=-1;
        let j=0;
        while(index===-1 && j<=rentForCategory.length){
          index=_.findIndex(rentForCategory[j].type, {'prod_id' : valueRent[i].prod_id});
          j++;
        }
        if(index!==-1){
          valueCategory[j-1].number=valueCategory[j-1].number + valueRent[i].number;
          valueCategory[j-1].value=valueCategory[j-1].value + valueRent[i].value;
        }
      }
      setCategory(valueCategory);
    }

    function getInfo(valueRent){
      fetch('http://localhost:8000/prods')
        .then(results => results.json())
        .then(info => {
          setInfo(info);
          const rentForCategory=
            _.chain(info)
            .groupBy("category")
            .map((value, key) => ({category: key, type: value}))
            .value();
          let num=[];
          for(var i in rentForCategory){
            num.push({name: rentForCategory[i].category, value: rentForCategory[i].type.length, fill: color[i]});
          }
          setNum(num);
          for(var i of info){
            let index=_.findIndex(valueRent, {'prod_id': i.prod_id});
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
            valueRent.push({prod_id: i.prod_id, value: i.value, number: i.number});
          }
          setValue(valueRent);
          getValueCategory(rentForCategory, valueRent);
          getStatus(info);
        });
    }

    function getStatus(info){//funzione che raggruppa e conta i prodotti a seconda del loro stato
      
      const percentage=
        _.chain(info)
        .groupBy("status")
        .map((value, key) => ({name: key, value: value.length }))
        .value();
      
       for(var i in percentage){
        percentage[i].fill=color[i];
      }
      setStatus(percentage);
    }
    const handleProd = () => {
      setIsShow(true);
    };

    const handleCategory = () => {
      setIsShow(false);
    };

    React.useEffect(() =>{
      getRent();
    }, []);


  
    if(isShow){
      return(
        
        <div id="inventario">
          <h1 id="arcobaleno">Statistiche inventario</h1>
          <div id="buttonShow">
            <>
              <style type="text/css">
                {`
                .btn-flat {
                  display: flex;
                  justify-content: center;
                  background-color: #edb5c0;
                  color: white;
                }
                .btn-flat:hover{
                  color: white;
                }
                .btn-flat:active{
                  border-color: #edb5c0;
                }
                .btn-check:focus + .btn, .btn:focus{
                  box-shadow: 0 0 0 .20rem rgba(237, 181, 192, 0.51);
                }
                `}
              </style>

              <ButtonGroup aria-label="singoli prodotti o categorie">
                <Button variant="flat" onClick={handleProd}>Prodotti</Button>
                <Button variant="flat" onClick={handleCategory} >Categorie</Button>
              </ButtonGroup>
            </>
          </div>
            <div id="singoliProdotti">
              <h5>Numero di noleggi per prodotto</h5>
              <BarCharT dati={valueProdRent} name={"numero di noleggi per prodotto"} xValue={"prod_id"} yValue={"number"} />
              <h5>Fatturato per ogni prodotto</h5>
              <BarCharT dati={valueProdRent} name={"fatturato per ogni prodotto"} xValue={"prod_id"} yValue={"value"}/>
              <h5 >Stato dei prodotti</h5>
              <PieCharT dati={statusProd} ></PieCharT>
              <h2>Informazioni prodotti</h2>
              <CardComponentProd info={infoProd} divName={"cardProdDiv"} keyDiv={"cardProd"}/>
            </div>
        </div>
      )
    }else{
      return(
        <div id="inventario">
          <h1 id="arcobaleno">Statistiche inventario</h1>
          <div id="buttonInventario">
            <>
              <style type="text/css">
                {`
                .btn-flat {
                  display: flex;
                  justify-content: center;
                  background-color: #edb5c0;
                  color: white;
                }
                .btn-flat:hover {
                  color: white;
                }
                .btn-flat:active{
                  border-color: #edb5c0;
                }
                .btn-check:focus + .btn, .btn:focus{
                  box-shadow: 0 0 0 .20rem rgba(237, 181, 192, 0.51);
                }
                `}
              </style>

              <ButtonGroup aria-label="singoli prodotti o categorie">
                <Button variant="flat" onClick={handleProd}>Prodotti</Button>
                <Button variant="flat" onClick={handleCategory} >Categorie</Button>
              </ButtonGroup>
            </>
          </div>
            <div id="categorieProdotti">
              <h5>Numero di noleggi per categoria di prodotti</h5>
              <BarCharT dati={valueCategoryRent} name={"numero di noleggi per categoria di prodotti"} xValue={"category"} yValue={"number"} />
              <h5>Fatturato per ogni categoria di prodotti</h5>
              <BarCharT dati={valueCategoryRent} name={"fatturato per ogni categoria di prodotto"} xValue={"category"} yValue={"value"}/>
              <h5 >Numero di prodotti per categoria</h5>
              <PieCharT dati={numProd} ></PieCharT>
            </div>
        </div>
      )
    }
    
}

export default Inventario;
