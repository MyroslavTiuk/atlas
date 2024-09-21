import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: "0", uv: 200 },
  //   { name: "1", uv: 120 },
  //   { name: "2", uv: 90 },
  { name: "3", ov: 170 },
  //   { name: "4", ov: 160 },
  //   { name: "5", ov: 160 },
  //   { name: "6", ov: 160 },
  //   { name: "7", ov: 160 },
  //   { name: "8", ov: 160 },
  //   { name: "9", ov: 160 },
  //   { name: "10", ov: 160 },
  //   { name: "11", ov: 160 },
  //   { name: "12", ov: 160 },
  //   { name: "1", ov: 160 },
  //   { name: "2", ov: 160 },

  { name: "3", ev: 160 },
  //   { name: "4", ev: 160 },
  //   { name: "5", ev: 160 },
  //   { name: "6", ev: 160 },
  //   { name: "7", ev: 160 },
  //   { name: "8", ev: 160 },

  { name: "9", yv: 160 },
  //   { name: "10", yv: 160 },
  //   { name: "11", yv: 160 },
  //   { name: "12", yv: 160 },
];

const ColorfulChart = () => (
  <ResponsiveContainer width={193} height={140}>
    <BarChart
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" />
      <YAxis />
      {/* {data[0] &&
        Object.keys(data[0])
          .filter((key) => key !== "name")
          .map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length][0]}
            />
          ))} */}
      <Bar dataKey="uv" fill="#92323b" />
      <Bar dataKey="ov" fill="#8867bf" />
      <Bar dataKey="ev" fill="#4ca7bf" />
      <Bar dataKey="yv" fill="#0da942" />
    </BarChart>
  </ResponsiveContainer>
);

export default ColorfulChart;
