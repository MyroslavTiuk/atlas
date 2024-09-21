import { BlackBorderedSpace } from "../../BlackBorderedSpace";
import ClockSvg from "../../../assets/conversation/clock.svg";

import styles from "./style.module.scss";

type TYPE_MOCKED_DATA = {
  time: string;
  count: number;
  part: string;
  date: string;
};

const MOCKED_DATA: TYPE_MOCKED_DATA = {
  time: "10:15",
  count: 45,
  part: "AM",
  date: "Tuesday, May 16",
};

const Clock = () => {
  const { count, date, part, time } = MOCKED_DATA;

  return (
    <BlackBorderedSpace width={86} height={82}>
      <div className={styles.container}>
        <img src={ClockSvg} alt="Clock" />
        <div className={styles.absolute_text}>
          <div className={styles.absolute_text_top}>
            <div className={styles.absolute_text_top_time}>{time}</div>
            <div className={styles.absolute_text_top_parts}>
              <div>{count}</div>
              <div>{part}</div>
            </div>
          </div>
          <div className={styles.absolute_text_bottom}>{date}</div>
        </div>
      </div>
    </BlackBorderedSpace>
  );
};

export default Clock;
