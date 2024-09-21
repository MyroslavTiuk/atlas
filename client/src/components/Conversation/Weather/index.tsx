import { BlackBorderedSpace } from "../../BlackBorderedSpace";
import SunSvg from "../../../assets/conversation/sun.svg";

import styles from "./style.module.scss";

const Weather = () => {
  return (
    <BlackBorderedSpace width={86} height={9}>
      <div className={styles.container}>
        <img src={SunSvg} alt="Sun" /> <div>Sunny</div>
      </div>
    </BlackBorderedSpace>
  );
};

export default Weather;
