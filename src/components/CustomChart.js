import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", Fahrzeuge: 40 },
  { month: "Feb", Fahrzeuge: 80 },
  { month: "Mar", Fahrzeuge: 70 },
];

const CustomChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="Fahrzeuge" stroke="#1890ff" />
    </LineChart>
  </ResponsiveContainer>
);

export default CustomChart;
