import "../App.css";
import {BarCharT} from '../components/barChart';
import React from "react";

function Inventario() {
    let [numClientRent, setData]=React.useState([]);//contiene l'id del cliente e il numero di rent
    React.useEffect(() =>{
      setData([]);
    fetch('http://localhost:8000/allRents')
      .then(results => results.json())
      .then(data => {
        const name = data //filtra i duplicati
          .map(dataItem => dataItem.prod_id) 
          .filter((prod_id, index, array) => array.indexOf(prod_id) === index);

        const counts = name //conta il numero di noleggi per ogni cliente
         .map(prod_id => ({
           prod_id: prod_id,
           value: data.filter(item => item.prod_id === prod_id).length//.filter crea un nuovo array con solo gli oggetti che hanno lo stesso id e restituisce la lunghezza dell'array
         }));
        setData(counts);
      });
    }, []);

    return (
      <div id="inventario">
        <h1>Statistiche inventario</h1>
        <h5>Numero di noleggi per prodotto</h5>
        <BarCharT dati={numClientRent} name={"numero di noleggi per prodotto"} etichetta={"prod_id"}/>
      </div>
      );
}

export default Inventario;
