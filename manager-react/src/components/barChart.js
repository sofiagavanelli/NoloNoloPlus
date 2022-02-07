import React from "react";
import "../App.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function BarCharT(props){

  return(
      <div className="bcClient">
        <ResponsiveContainer width="90%" height={600}>
            <BarChart
            width="10%" 
            data={props.dati}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 10
            }}
            barSize={20}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={props.xValue} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" margin={{top: 5, left: 0, right: 0, bottom: 0}}/>
            <Bar name={props.name} dataKey={props.yValue} fill="#9aa5c3" />
            </BarChart>
        </ResponsiveContainer>
      </div>
  );
}

