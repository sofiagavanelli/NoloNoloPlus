import React from "react";
import "../App.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


export function LineChartClienti(){
  let [clientData, setData]=React.useState([]);
  
  

  React.useEffect(() => {//il fetch viene eseguito solo dopo il primo render grazie al parametro '[]', però i dati vengono persi ogni volta che c'è un nuovo render
    setData([]);
    fetch('http://localhost:8680/allRents')
      .then(results => results.json())
      .then(data => {
        var count=0;
        for(var i of data){
          count++;
          let newData={client_id: i.client_id, value: count};
          setData(clientData => [...clientData, newData]);//aggiungo il nuovo oggetto in coda all'array hooks
        }
      });
  }, []);
    return (
      <div className="chartDiv">
        
        <ResponsiveContainer width="90%" height={600}>
          <LineChart
            data={clientData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="client_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          
          </LineChart>
        </ResponsiveContainer>
      </div>
      
    );
}
