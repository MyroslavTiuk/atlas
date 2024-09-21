import ChartPoint from "./ChartPoint";

type TYPE_DATA = {
  text: string;
  notifications: number;
}[];

const MOCKED_DATA: TYPE_DATA = [
  { text: "Speeding", notifications: 110 },
  { text: "Red light running", notifications: 75 },
  { text: "Crashes", notifications: 80 },
  { text: "Criminal activity", notifications: 43 },
  { text: "Illegal parking", notifications: 123 },
];

const ChartPoints = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {MOCKED_DATA.map((item, index) => (
        <ChartPoint
          key={index}
          notifications={item.notifications}
          text={item.text}
        />
      ))}
    </div>
  );
};

export default ChartPoints;
