import ComponentModal from "../ComponentModal";
// import { BarChart, Bar, XAxis, YAxis } from "recharts";
import Arrow from "../../assets/Pink_arrow.svg";

import styles from "./style.module.scss";
import { BlackBorderedSpace } from "../BlackBorderedSpace";
import SecondChart from "./SecondChart";

// const data = [
//   { time: "|", uv: 0.5 },
//   { time: "2", uv: 1.5 },
//   { time: "|", uv: 1.2 },
//   { time: "4", uv: 2.3 },
//   { time: "|", uv: 1.8 },
//   { time: "6", uv: 3.5 },
//   { time: "|", uv: 2.0 },
//   { time: "8", uv: 1.6 },
//   { time: "|", uv: 2.1 },
//   { time: "10", uv: 1.4 },
//   { time: "|", uv: 1.0 },
// ];

// const CustomizedLabel = (props: any) => {
//   const { x, y, width, value } = props;
//   const radius = 10;
//   return (
//     <g>
//       <text
//         x={x + width / 2}
//         y={y - radius}
//         fill="#FF66CC"
//         textAnchor="middle"
//         dominantBaseline="middle"
//       >
//         {value == "3.5" && `$${value}`}
//       </text>
//     </g>
//   );
// };

// const CustomizedTick = (props: any) => {
//   const { x, y, payload } = props;
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text x={0} y={0} dy={16} textAnchor="center" fill="white">
//         {payload.value}
//       </text>
//     </g>
//   );
// };

const PriceStatistics = () => {
  return (
    <ComponentModal title="Traffic Count" width={327} height={275} seeMore>
      <div className={styles.container}>
        <SecondChart />
        {/* <BarChart
          width={422}
          height={134}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="time" tick={<CustomizedTick />} axisLine={false} />
          <YAxis
            tick={{
              fill: "white",
            }}
            tick={<CustomizedTick />}
          />

          <Tooltip />
          <Bar
            label={<CustomizedLabel />}
            dataKey="uv"
            fill="#D3B8D8"
            barSize={16}
            shape={(props: any) => {
              const { x, y, width, height, fill, payload } = props;
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={payload.time === "6" ? "#FF66CC" : fill}
                />
              );
            }}
          />
        </BarChart> */}
        <div className={styles.container_hours}>
          <p>12am</p>
          <p>
            <div>
              <img src={Arrow} alt="BackArrow" />
            </div>
            <div>
              <img src={Arrow} alt="BackArrow" />
            </div>
          </p>
          <p>12pm</p>
        </div>
        <div className={styles.container_details}>
          <BlackBorderedSpace>Passenger Vehicles</BlackBorderedSpace>
          <BlackBorderedSpace>Pedestrians</BlackBorderedSpace>
          <BlackBorderedSpace>Micro-Mobility</BlackBorderedSpace>
        </div>
      </div>
    </ComponentModal>
  );
};

export default PriceStatistics;
