import { BlackBorderedSpace } from "../../BlackBorderedSpace";

import styles from "./style.module.scss";

const Support = () => {
  return (
    <BlackBorderedSpace width={383} height={31}>
      <div className={styles.container}>
        <div className={styles.container_title}>Support</div>
        <div className={styles.container_text}>
          Need help with our technology?{" "}
          <span>Contact the Atlas team for support</span>
        </div>
      </div>
    </BlackBorderedSpace>
  );
};

export default Support;
