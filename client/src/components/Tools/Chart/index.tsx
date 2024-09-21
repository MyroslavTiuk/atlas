import { PieChart, Pie, Cell } from "recharts";

import styles from "./style.module.scss";

const data = [
  { name: "Penthouses", value: 8, units: 27, color: "#8d5ad2" },
  { name: "Apartments", value: 47, units: 672, color: "#b53b3b" },
  { name: "Multi family", value: 17, units: 105, color: "#036e23" },
];

const Chart = () => {
  const NUMBER = 57;

  return (
    <div className={styles.container}>
      <PieChart width={156} height={156}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={56}
          innerRadius={45}
          // cornerRadius={50}
          fill="#8884d8"
          stroke="none"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div className={styles.container_number}>{NUMBER}</div>
    </div>
  );
};

export default Chart;
