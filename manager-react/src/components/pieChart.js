import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export function PieCharT(props){
    return (
        <ResponsiveContainer width="100%" height={600}>
          <PieChart width={500} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={props.dati}
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label
            />
            <Legend verticalAlign="top" height={36}/>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
}