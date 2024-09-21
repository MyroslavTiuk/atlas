import { useNavigate } from "react-router-dom";
import ComponentModal from "../../ComponentModal";
import { GradientButton } from "../../GradientButton";

import styles from "./style.module.scss";
import { useLogoutMutation } from "../../../redux/api/auth";

const UserDashboard = () => {
  const navigate = useNavigate();
  const refresh = localStorage.getItem("refresh");

  const [logout] = useLogoutMutation();

  const logoutHandler = () => {
    if (refresh) {
      logout({ refresh });
    }
    if (localStorage.getItem("access")) {
      localStorage.removeItem("access");
    }
    if (localStorage.getItem("refresh")) {
      localStorage.removeItem("refresh");
    }
    return navigate("/signIn");
  };

  return (
    <ComponentModal>
      <div className={styles.container}>
        <div className={styles.container_title}>User Dashboard</div>
        <div className={styles.container_buttons}>
          <GradientButton height={24} width={152}>
            Clock In
          </GradientButton>
          <GradientButton height={24} width={152}>
            Update All Software
          </GradientButton>
          <GradientButton height={24} width={152}>
            Smart Control Settings
          </GradientButton>
          <GradientButton height={24} width={152} onClick={logoutHandler}>
            Logout
          </GradientButton>
        </div>
      </div>
    </ComponentModal>
  );
};

export default UserDashboard;
