import { BlackBorderedSpace } from "../../BlackBorderedSpace";

import styles from "./style.module.scss";

const USER_NUMBER = "USER-2024-001";

const UserData = () => {
  return (
    <BlackBorderedSpace width={103} height={9}>
      <div className={styles.container}>{USER_NUMBER}</div>
    </BlackBorderedSpace>
  );
};

export default UserData;
