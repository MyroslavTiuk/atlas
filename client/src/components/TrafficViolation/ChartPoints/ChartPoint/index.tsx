import { BlackBorderedSpace } from "../../../BlackBorderedSpace";

import styles from "./style.module.scss";

type Props = {
  text: string;
  notifications: number;
};

const ChartPoint = ({ text, notifications }: Props) => {
  return (
    <BlackBorderedSpace width={148} height={7}>
      <div className={styles.container}>
        <div className={styles.container_text}>{text}</div>
        <div className={styles.container_notifications}>{notifications}</div>
      </div>
    </BlackBorderedSpace>
  );
};

export default ChartPoint;
