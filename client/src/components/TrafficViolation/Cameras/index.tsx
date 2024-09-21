import CameraItem from "./CameraItem";

import styles from "./style.module.scss";

type TYPE_DATA = {
  title: string;
  notifications: number;
  total: string;
}[];

const MOCKED_DATA: TYPE_DATA = [
  {
    title: "Speeding",
    notifications: 110,
    total: "Violations",
  },
  {
    title: "Car Crashes",
    notifications: 50,
    total: "Crashes",
  },
  {
    title: "Crimes",
    notifications: 24,
    total: "Crimes",
  },
];

const Cameras = () => {
  return (
    <div className={styles.container} id="scrollable-container">
      {MOCKED_DATA.map((item) => (
        <CameraItem
          title={item.title}
          notifications={item.notifications}
          total={item.total}
        />
      ))}
    </div>
  );
};

export default Cameras;
