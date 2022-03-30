import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './../../css/styles.css';

function Pie_Chart(props){

  let data = props.data;

  let active = 0; let deaths = 0; let recovered = 0;

  for(let i = 0; i < data.length; i++){
    active += data[i].Active;
    deaths += data[i].Deaths;
    recovered += data[i].Recovered;
  }

  let pieChartData_total = [
    {name: 'Active', value: active},
    {name: 'Deaths', value: deaths},
    {name: 'Recovered', value: recovered}
  ]

  const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

  return (
    <div className="adjust-graphs">
      <ResponsiveContainer width="100%" aspect={3}>
        <PieChart>
          <Pie data={pieChartData_total} nameKey="name" dataKey="value" cx="50%" cy="50%" outerRadius={75} label>
            {pieChartData_total.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Pie_Chart;
