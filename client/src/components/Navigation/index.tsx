import ActiveDashboard from "./ActiveDashboard";
import UserDashboard from "./UserDashboard";

import styles from "./style.module.scss";

const Navigation = () => {
  return (
    <section className={styles.container}>
      <UserDashboard />
      <ActiveDashboard />
    </section>
  );
};

export default Navigation;
