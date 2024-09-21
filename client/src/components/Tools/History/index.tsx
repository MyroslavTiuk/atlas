import { BlackBorderedSpace } from "../../BlackBorderedSpace";

import styles from "./style.module.scss";

const History = () => {
  return (
    <BlackBorderedSpace width={199} height={35}>
      <div className={styles.container}>
        <div className={styles.container_title}>History</div>
        <div className={styles.container_points}>
          <BlackBorderedSpace height={4}>
            <div className={styles.text}>Current week</div>
          </BlackBorderedSpace>
          <BlackBorderedSpace height={4}>
            <div className={styles.text}>Month</div>
          </BlackBorderedSpace>
          <BlackBorderedSpace height={4}>
            <div className={styles.text}>Year</div>
          </BlackBorderedSpace>
        </div>
      </div>
    </BlackBorderedSpace>
  );
};

export default History;
