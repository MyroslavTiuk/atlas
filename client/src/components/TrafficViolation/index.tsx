import ComponentModal from "../ComponentModal";
import ChartPoints from "./ChartPoints";
import BackArrow from "../../assets/Pink_arrow.svg";

import styles from "./style.module.scss";
import Cameras from "./Cameras";
import SecondTrafficChart from "./SecondTrafficChart";

const TrafficViolation = () => {
  const scrollLeft = () => {
    document.getElementById("scrollable-container")!.scrollBy({
      left: -100,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    document.getElementById("scrollable-container")!.scrollBy({
      left: 100,
      behavior: "smooth",
    });
  };

  return (
    <ComponentModal title="Real Time Traffic Violation and Crime" width={348}>
      <div className={styles.container}>
        <div className={styles.container_chart}>
          <SecondTrafficChart />
          <ChartPoints />
        </div>
        <div className={styles.container_arrows}>
          <img src={BackArrow} alt="Back Arrow" onClick={scrollLeft} />
          <img src={BackArrow} alt="Back Arrow" onClick={scrollRight} />
        </div>
        <div className={styles.container_cameras}>
          <Cameras />
        </div>
      </div>
    </ComponentModal>
  );
};

export default TrafficViolation;
