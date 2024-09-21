import ComponentModal from "../../ComponentModal";
import { GradientButton } from "../../GradientButton";

import styles from "./style.module.scss";

const ActiveDashboard = () => {
  return (
    <ComponentModal>
      <div className={styles.container}>
        <div className={styles.container_block}>
          <div>
            Control <br /> Dashboard
          </div>
          <div className={styles.container_title}>Active Hardware</div>
          <div className={styles.container_buttons}>
            <GradientButton width={152} height={24}>
              ATLAS One Camera System
            </GradientButton>
            <GradientButton width={152} height={24}>
              Smart Hub Mini
            </GradientButton>
            <GradientButton width={152} height={24}>
              Aero Vision (AV)
            </GradientButton>
          </div>
        </div>
        <div className={styles.container_block}>
          <div className={styles.container_title}>Active Software</div>
          <div className={styles.container_buttons_big}>
            <GradientButton width={152} height={24}>
              Intelli Flow
            </GradientButton>
            <GradientButton width={152} height={24}>
              Grid Flow
            </GradientButton>
            <GradientButton width={152} height={24}>
              Auto Sync
            </GradientButton>
            <GradientButton width={152} height={24}>
              Sky Track
            </GradientButton>
            <GradientButton width={152} height={24}>
              RedEye
            </GradientButton>
            <GradientButton width={152} height={24}>
              Rapid Response
            </GradientButton>
            <GradientButton width={152} height={24}>
              Crime Watch
            </GradientButton>
            <GradientButton width={152} height={24}>
              School Guard
            </GradientButton>
            <GradientButton width={152} height={24}>
              Cyber Shield
            </GradientButton>
            <GradientButton width={152} height={24}>
              Maintenance +
            </GradientButton>
            <GradientButton width={152} height={24}>
              Traffic Pulse
            </GradientButton>
            <GradientButton width={152} height={24}>
              Smart Support
            </GradientButton>
          </div>
        </div>
        <div className={styles.container_block}>
          <div className={styles.container_title}>Inactive Software</div>
          <GradientButton height={24} width={152}>
            None
          </GradientButton>
          <div className={styles.container_title}>Inactive Software</div>
          <GradientButton height={24} width={152}>
            Coming Soon
          </GradientButton>
        </div>
      </div>
    </ComponentModal>
  );
};

export default ActiveDashboard;
