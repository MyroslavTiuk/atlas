import { BlackBorderedSpace } from "../../BlackBorderedSpace";

import WarningSvg from "../../../assets/icons/tools/Warning.svg";
import ArrowUpSvg from "../../../assets/icons/tools/ArrowUp.svg";
import CrashesImage from "../../../assets/crash.png";

import styles from "./style.module.scss";

const CarCrashes = () => {
  return (
    <BlackBorderedSpace width={222} height={86}>
      <div className={styles.container}>
        <div className={styles.container_header}>
          <img src={WarningSvg} alt="Warning" />
          <div>Car Crashe - ID: 67890</div>
          <img src={ArrowUpSvg} alt="arrow" />
        </div>
        <div className={styles.container_body}>
          <img src={CrashesImage} alt="crashes" width={220} />
        </div>
      </div>
    </BlackBorderedSpace>
  );
};

export default CarCrashes;
