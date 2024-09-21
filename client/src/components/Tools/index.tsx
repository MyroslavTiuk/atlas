import ComponentModal from "../ComponentModal";
import CarCrashes from "./CarCrashes";
import Chart from "./Chart";

import styles from "./style.module.scss";
import Nav from "./Nav";
import History from "./History";

const Tools = () => {
  return (
    <ComponentModal width={456}>
      <div className={styles.container}>
        <div className={styles.container_title}>Notification Center</div>
        <div className={styles.container_content}>
          <div className={styles.container_content_leftSide}>
            <CarCrashes />
            <Chart />
          </div>
          <div className={styles.container_content_rightSide}>
            <Nav />
            <History />
          </div>
        </div>
      </div>
    </ComponentModal>
  );
};

export default Tools;
