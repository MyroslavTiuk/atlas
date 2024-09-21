import { BlackBorderedSpace } from "../../BlackBorderedSpace";
import Avatar from "../../../assets/conversation/avatar.svg";

import styles from "./style.module.scss";

type TYPE_MOCKED_DATA = {
  avatar: string;
  name: string;
  text: string;
  notifications: number;
  time: string;
};

const MOCKED_DATA: TYPE_MOCKED_DATA = {
  avatar: Avatar,
  name: "Robert Fox",
  text: "Hi! How are we going?",
  notifications: 2,
  time: "10:12",
};

const Messages = () => {
  return (
    <BlackBorderedSpace width={150} height={51} title="Messages">
      <div className={styles.container}>
        <div className={styles.container_leftSide}>
          <img src={MOCKED_DATA.avatar} alt="avatar" />
          <div className={styles.container_leftSide_text}>
            <div>{MOCKED_DATA.name}</div>
            <div>{MOCKED_DATA.text}</div>
          </div>
        </div>
        <div className={styles.container_rightSide}>
          <div className={styles.container_rightSide_circle}>
            {MOCKED_DATA.notifications}
          </div>
          <div className={styles.container_rightSide_time}>
            {MOCKED_DATA.time}
          </div>
        </div>
      </div>
    </BlackBorderedSpace>
  );
};

export default Messages;
