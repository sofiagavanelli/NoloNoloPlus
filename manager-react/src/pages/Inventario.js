import "../App.css";
import {BarCharT} from '../components/barChart';
import {CardComponentProd} from '../components/cardComponentProd';
import React from "react";
import { Button, ButtonGroup } from 'react-bootstrap';
var _ = require('lodash');


function Inventario() {
    const [valueProdRent, setValue]= React.useState([]);
    const [valueCategoryRent, setCategory]= React.useState([]);
    const [infoProd, setInfo]=React.useState([]);
    const [isShow, setIsShow] = React.useState(true);//se è true vengono visualizzati i singoli prodotti, se è false vengono visualizzate le categorie

    
    function getRent(){
      fetch('http://localhost:8000/allRents')
      .then(results => results.json())
      .then(data => {
        getValueProduct(data);
      });
    }
    
    function getValueProduct(data){
      const rentForProd=
      _.chain(data)//creo un oggetto che contiene il client id e tutti i suoi noleggi 
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
          
          if(rentForProd[i].rents[j].approved){//manca da controllare se il noleggio è finito
            tot=tot + rentForProd[i].rents[j].price;
            num++;
          }
          valueRent[i].value = _.toNumber(tot);
          valueRent[i].number = num;
        }
      }
      getInfo(valueRent);
    }

    function getValueCategory(rentForCategory, valueRent){
      let valueCategory=[];
      console.log("rentForCategory");
      console.log(rentForCategory);
      console.log("valueRent");
      console.log(valueRent);
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
        });
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
                .btn-flat:hover{
                  color: white;
                }
                .btn-flat:active{
                  border-color: #edb5c0;
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
              <h2>Informazioni prodotti</h2>
              <CardComponentProd info={infoProd} divName={"cardProdDiv"} keyDiv={"cardProd"}/>
            </div>
        </div>
      )
    }else{
      return(
        <div id="inventario">
          <h1>Statistiche inventario</h1>
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
              
            </div>
        </div>
      )
    }
    
}

export default Inventario;
