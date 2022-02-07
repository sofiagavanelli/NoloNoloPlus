import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export function DoublePieCharT(props){
    return (
        <ResponsiveContainer width="100%" height={600}>
          <PieChart width="50%" height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={props.dati1}
              cx="30%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label
            />
            <Legend verticalAlign="top" height={36} align= "center"/>
            <Tooltip />
          

            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={props.dati2}
              cx="60%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label
            />
            <Legend verticalAlign="bottom" height={36} align="center"/>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
    );
}