import React from "react";
import "../App.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function BarChartClient(){
  let [numClientRent, setData]=React.useState([]);
  let [valueClientRent, setValue]= React.useState([]);
  
  React.useEffect(() => {//il fetch viene eseguito solo dopo il primo render grazie al parametro '[]', però i dati vengono persi ogni volta che c'è un nuovo render
    setData([]);
    fetch('http://localhost:8680/allRents')
      .then(results => results.json())
      .then(data => {
        console.log("data");
        console.log(data);
        const name = data //filtra i duplicati
          .map(dataItem => dataItem.client_id)
          .filter((client_id, index, array) => array.indexOf(client_id) === index);
        
        const counts = name //conta i valori 
          .map(client_id => ({
            clientId: client_id,
            value: data.filter(item => item.client_id === client_id).length//.filter crea un nuovo array con solo gli oggetti che hanno lo stesso id e restituisce la lunghezza dell'array
          }));
        
        const val = name //conta i valori 
          .map(client_id => ({
            clientId: client_id,
            value: ((data.filter(item => item.client_id === client_id)).reduce(function(prev, current) {return prev.price+ +current.price}))
          }));
        setData(counts);
        setValue(val);
        console.log("counts");
        console.log(counts);
        console.log("val");
        console.log(val);
      });
  }, []);

  return(
      <div className="bcClient">
        <ResponsiveContainer width="90%" height={600}>
            <BarChart
            width="10%" 
            data={numClientRent}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 10
            }}
            barSize={40}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="clientId" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" margin={{top: 5, left: 0, right: 0, bottom: 0}}/>
            <Bar name="number of rent" dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
      </div>
  );
}
