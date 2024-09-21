import { BlackBorderedSpace } from "../../BlackBorderedSpace";
import { GradientButton } from "../../GradientButton";

import TimeSvg from "../../../assets/conversation/time.svg";
import ManagerSvg from "../../../assets/conversation/manager.svg";

import styles from "./style.module.scss";

type MOCKED_DATA_TYPE = {
  title: string;
  startTime: string;
  endTime: string;
  name: string;
};

const MOCKED_DATA: MOCKED_DATA_TYPE = {
  title: "Meeting with Team",
  name: "Manager",
  startTime: "10:00 AM",
  endTime: "11:00 AM",
};

const TodaySchedule = () => {
  const { title, name, endTime, startTime } = MOCKED_DATA;

  return (
    <BlackBorderedSpace title="Today's Schedule" width={150} height={126}>
      <div className={styles.container}>
        <div className={styles.container_text}>
          {title && <p>1. {title}</p>}
          {startTime && endTime && (
            <p>
              <img src={TimeSvg} alt="time" />
              {startTime} - {endTime}
            </p>
          )}
          {name && (
            <p>
              <img src={ManagerSvg} alt="manager" /> {name}
            </p>
          )}
        </div>
        <GradientButton radius={4} width={152} height={24}>
          Add New Task
        </GradientButton>
      </div>
    </BlackBorderedSpace>
  );
};

export default TodaySchedule;
