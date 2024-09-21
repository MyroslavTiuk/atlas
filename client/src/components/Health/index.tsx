import ComponentModal from "../ComponentModal";
import { Cell, Pie, PieChart } from "recharts";
import { COLORS } from "../../constants/scss/COLORS";
import YellowLine from "../../assets/Yellow_line.svg";
import LightBlueLine from "../../assets/Lightblue_line.svg";
import BlueLine from "../../assets/Blue_line.svg";
import PurpleLine from "../../assets/Purple_line.svg";

import styles from "./style.module.scss";
import Arrow from "../../assets/home/Front_arrow.svg";

const data = [
  { name: "Pot Holes", value: 3, units: 4, color: "#f7c159" },
  { name: "Cracks", value: 1, units: 2, color: "#47bee2" },
  { name: "Hazards", value: 2, units: 1, color: "#0544be" },
  { name: "Dead Bulbs", value: 6, units: 1, color: "#8d5ad2" },
];

const data2 = [
  {
    name: "Penthouses",
    value: 50,
    units: 27,
    color: COLORS.PRIMARY_PINK,
  },
];

const Health = () => {
  return (
    <ComponentModal width={350}>
      <div className={styles.container}>
        <div className={styles.container_title}>
          <div>Intersection Health</div>
          <p>Intersection ID : 435</p>
        </div>

        <div className={styles.container_pie}>
          <div className={styles.main}>Health Score</div>
          <div className={styles.percentage}>54%</div>
          <div className={styles.container_pie_leftTopCorner}>
            <div>
              <p>{data[0].name}</p>
              <p>Severity: {data[0].value}/10</p>
              <p>
                Total:
                {data[0].units}
              </p>
            </div>
            <img src={YellowLine} alt="yellow line" width={46} height={46} />
          </div>
          <div className={styles.container_pie_rightTopCorner}>
            <img src={LightBlueLine} alt="light line" width={46} height={46} />
            <div>
              <p>{data[1].name}</p>
              <p>Severity: {data[1].value}/10</p>
              <p>
                Total:
                {data[1].units}
              </p>
            </div>
          </div>
          <div className={styles.container_pie_rightBottomCorner}>
            <img src={BlueLine} alt="" width={46} height={46} />
            <div>
              <p>{data[3].name}</p>
              <p>Severity: {data[3].value}/10</p>
              <p>
                Total:
                {data[3].units}
              </p>
            </div>
          </div>
          <div className={styles.container_pie_leftBottomCorner}>
            <div>
              <p>{data[2].name}</p>
              <p>Severity: {data[2].value}/10</p>
              <p>
                Total:
                {data[2].units}
              </p>
            </div>
            <div className={styles.container_pie_rightBottomCorner}>
              <img src={PurpleLine} alt="" width={46} height={46} />
            </div>
          </div>
          <PieChart width={156} height={186}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={54}
              innerRadius={46}
              cornerRadius={50}
              fill="#8884d8"
              stroke="none"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className={styles.container_pie_inside}>
            <PieChart width={200} height={230}>
              <Pie
                width={106}
                height={106}
                data={data2}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={41}
                innerRadius={35}
                startAngle={400}
                endAngle={200}
                cornerRadius={1}
                fill="#8884d8"
                stroke="none"
                dataKey="value"
              >
                {data2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className={styles.see_more}>
            See More
            <img src={Arrow} alt="Arrow" width={16} height={16} />
          </div>
        </div>
      </div>
    </ComponentModal>
  );
};

export default Health;
