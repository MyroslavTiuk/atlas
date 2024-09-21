import { PieChart } from "@mui/x-charts";
import { COLORS } from "../../constants/scss/COLORS";
import styles from "./style.module.scss";
import TopLine from "../../assets/charts/TopLine.svg";
import BottomLine from "../../assets/charts/BottomLine.svg";

type Props = {
  title: string | undefined;
  word1?: string;
  word2?: string;
  colors?: {
    red: number | undefined;
    yellow: number | undefined;
    green: number | undefined;
    purple: number | undefined;
    blue: number | undefined;
    pink: number | undefined;
  };
};

const StickChart = ({ title, word1, word2, colors }: Props) => {
  const needItems = [
    ...Array(colors?.yellow ? Math.round(colors?.yellow / 2) : 0).fill({
      value: 3,
      color: "yellow",
    }),
    ...Array(colors?.pink ? Math.round(colors?.pink / 2) : 0).fill({
      value: 3,
      color: COLORS.PRIMARY_PINK,
    }),
    ...Array(colors?.green ? Math.round(colors?.green / 2) : 0).fill({
      value: 3,
      color: "green",
    }),
    ...Array(colors?.blue ? Math.round(colors?.blue / 2) : 0).fill({
      value: 3,
      color: "blue",
    }),
    ...Array(colors?.purple ? Math.round(colors?.purple / 2) : 0).fill({
      value: 3,
      color: "purple",
    }),
    ...Array(colors?.red ? Math.round(colors?.red / 2) : 0).fill({
      value: 3,
      color: "red",
    }),
  ];

  return (
    <div className={styles.container}>
      {colors && (
        <div>
          <img className={styles.top_line} src={TopLine} alt="TopLine" />

          <PieChart
            series={[
              {
                data: needItems,
                innerRadius: 28,
                outerRadius: 35,
                paddingAngle: 2,
                cornerRadius: 2,
                startAngle: -90,
                cx: 55,
              },
            ]}
            width={96}
            height={132}
          />

          <img
            className={styles.bottom_line}
            src={BottomLine}
            alt="BottomLine"
          />
        </div>
      )}
      {colors && <p>{title}</p>}
      {colors && (
        <h3
          className={
            word1 == "Environmental"
              ? styles.enviromental
              : word1 == "Efficiency"
              ? styles.efficiency
              : ""
          }
        >
          {word1} <br /> {word2}
        </h3>
      )}
    </div>
  );
};

export default StickChart;
