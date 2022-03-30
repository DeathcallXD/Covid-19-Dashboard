import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import './../../css/styles.css';

function Line_Chart(props){

  function formatDate(value) {
    let date = new Date(value);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }

  let data = props.data;
  let new_data = [];
  for(let i = 0; i < data.length/30; i++){
    new_data.push(data[30*i]);
  }
  data = new_data;

  return (
    <div className="adjust-graphs">
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={data}>
          <XAxis dataKey="Date" tickFormatter={value => formatDate(value)} interval="preserveStartEnd" />
          <YAxis yAxisId="left" tickFormatter={(value) => value/1000} />
          <YAxis yAxisId="right" tickFormatter={(value) => value/1000} orientation="right" />
          <Legend />
          <Tooltip labelFormatter={value => formatDate(value)}/>
          <Line yAxisId="left" type="monotone" dataKey="Confirmed" stroke="blue" activeDot={{r: 4}} />
          <Line yAxisId="right" type="monotone" dataKey="Deaths" stroke="red" activeDot={{r: 4}} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Line_Chart;
