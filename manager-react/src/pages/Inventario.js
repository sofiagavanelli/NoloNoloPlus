import "../App.css";
import {BarCharT} from '../components/barChart';
import {PieCharT} from '../components/pieChart';
import {CardComponentProd} from '../components/cardComponentProd';
import React from "react";
import { Button, ButtonGroup, Form } from 'react-bootstrap';
var _ = require('lodash');


function Inventario() {
    const [valueProdRent, setValue]= React.useState([]);//valore dei noleggi per ogni prodotto
    const [valueCategoryRent, setCategory]= React.useState([]);//valore dei noleggi per ogni categoria
    const [infoProd, setInfo]=React.useState([]);//contiene le informazioni dei prodotti
    const [statusProd, setStatus]=React.useState([]);//contiene lo stato dei prodotti (ottimo, rovinato, buono, rotto)
    const [numProd, setNum]=React.useState([]);//contiene il numero di prodotti per categoria
    const [isShow, setIsShow] = React.useState(true);//se è true vengono visualizzati i singoli prodotti, se è false vengono visualizzate le categorie
    const color=['#8884d8', '#8dd1e1', '#d0ed57', '#ffc658'];//contiene i colori per i pie chart
    const [rentCategory, setRent]=React.useState([]);//contiene i prodotti per ogni categoria
    const [filtrati, setFiltrati]=React.useState([]);//contiene i prodotti filtrati per categorie
    const [rentProd, setRentProd]=React.useState([]);
    
    //funzione che restituisce tutti i noleggi
    function getRent(){
      fetch('https://site202133.tw.cs.unibo.it/allRents')
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
      setRentProd(rentForProd);
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
      fetch('https://site202133.tw.cs.unibo.it/prods')
        .then(results => results.json())
        .then(info => {
          setInfo(info);
          setFiltrati(info);
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
          setRent(rentForCategory);
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
    
    function filterCategory(filtro){
      const value=filtro.target.value;
      if(value==="tutti"){
        setFiltrati(infoProd);
      }else{
        if(value==="yacth"){
          setFiltrati(rentCategory[0].type);
        }else{
          if(value==="barca"){
            setFiltrati(rentCategory[1].type);
          }else{
            if(value==="gommoni"){
              setFiltrati(rentCategory[2].type);
            }
          }
        }
      }
    }

    React.useEffect(() =>{
      getRent();
    }, []);

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
          {isShow
              ? <div id="singoliProdotti">
                  <h5>Numero di noleggi per prodotto</h5>
                  <BarCharT dati={valueProdRent} name={"numero di noleggi per prodotto"} xValue={"prod_id"} yValue={"number"} />
                  <hr  style={{
                      color: 'red',
                      backgroundColor: 'red',
                      height: 5
                  }}/>
                  <h5>Fatturato per ogni prodotto</h5>
                  <BarCharT dati={valueProdRent} name={"fatturato per ogni prodotto"} xValue={"prod_id"} yValue={"value"}/>
                  <hr  style={{
                      color: 'red',
                      backgroundColor: 'red',
                      height: 5
                  }}/>
                  <h5 >Stato dei prodotti</h5>
                  <PieCharT dati={statusProd} ></PieCharT>
                  <hr  style={{
                      color: 'red',
                      backgroundColor: 'red',
                      height: 5
                  }}/>
                </div>
              
              : <div id="categorieProdotti">
                  <h5>Numero di noleggi per categoria di prodotti</h5>
                  <BarCharT dati={valueCategoryRent} name={"numero di noleggi per categoria di prodotti"} xValue={"category"} yValue={"number"} />
                  <hr  style={{
                      color: 'red',
                      backgroundColor: 'red',
                      height: 5
                  }}/>
                  <h5>Fatturato per ogni categoria di prodotti</h5>
                  <BarCharT dati={valueCategoryRent} name={"fatturato per ogni categoria di prodotto"} xValue={"category"} yValue={"value"}/>
                  <hr  style={{
                      color: 'red',
                      backgroundColor: 'red',
                      height: 5
                  }}/>
                  <h5 >Numero di prodotti per categoria</h5>
                  <PieCharT dati={numProd} ></PieCharT>
                  <hr  style={{
                      color: 'red',
                      backgroundColor: 'red',
                      height: 5
                  }}/>
                </div>
          }
          <h2>Informazioni prodotti</h2>
          <Form.Select aria-label="Seleziona categoria prodotti" onChange={(filtro) => {
                    filterCategory(filtro);

                }}>
            <option value="tutti">Seleziona categoria</option>
            <option value="yacth">Yacth</option>
            <option value="barca">Barche</option>
            <option value="gommoni">Gommoni</option>
          </Form.Select>
          <CardComponentProd info={filtrati} divName={"cardProdDiv"} keyDiv={"cardProd"} filtrare={rentProd}/>
      </div>
    );
    
    
}

export default Inventario;
