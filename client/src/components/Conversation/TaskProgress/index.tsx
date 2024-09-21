import { BlackBorderedSpace } from "../../BlackBorderedSpace";
import { LinearProgress } from "@mui/material";

import styles from "./style.module.scss";

type TYPE_MOCKED_DATA = {
  name: string;
  current_progress_1: number;
  max_progress_1: number;
  current_progress_2: number;
  max_progress_2: number;
};

const MOCKED_DATA: TYPE_MOCKED_DATA = {
  name: "Name Task1",
  current_progress_1: 76,
  max_progress_1: 118,
  current_progress_2: 54,
  max_progress_2: 110,
};

const TaskProgress = () => {
  const {
    current_progress_1,
    current_progress_2,
    max_progress_1,
    max_progress_2,
    name,
  } = MOCKED_DATA;

  const firstProgressValue = (current_progress_1 / max_progress_1) * 100;
  const secondProgressValue = (current_progress_2 / max_progress_2) * 100;

  return (
    <BlackBorderedSpace width={103} height={82}>
      <div className={styles.container}>
        <div className={styles.container_name}>{name}</div>
        <div className={styles.container_task}>
          <div className={styles.container_task_text}>
            <span>Task Done:{"   "}</span>
            <span>
              {current_progress_1}/{max_progress_1}
            </span>
          </div>
          <LinearProgress variant="determinate" value={firstProgressValue} />
        </div>
        <div className={styles.container_task}>
          <div className={styles.container_task_text}>
            <span>Task Done: {"  "}</span>
            <span>
              {current_progress_2}/{max_progress_2}
            </span>
          </div>
          <LinearProgress variant="determinate" value={secondProgressValue} />
        </div>
      </div>
    </BlackBorderedSpace>
  );
};

export default TaskProgress;
