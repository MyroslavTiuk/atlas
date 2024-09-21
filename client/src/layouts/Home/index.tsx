import { BlueButton } from "../../components/BlueButton";

// SVG
import FileSvg from "../../assets/home/File.svg";
import AlarmSvg from "../../assets/alarm.svg";
import TaskSvg from "../../assets/home/Task.svg";

import Scores from "../../components/Scores";
import Location from "../../components/Location";
import PriceStatistics from "../../components/PriceStatistics";
import Conversation from "../../components/Conversation";
import Health from "../../components/Health";

import styles from "./style.module.scss";
import Map from "../../components/Map";
import Tools from "../../components/Tools";
import TrafficViolation from "../../components/TrafficViolation";

import Navigation from "../../components/Navigation";
import CameraView from "../../components/CameraView";

const Home = () => {
  return (
    <section className={styles.other_content}>
      <div className={styles.container}>
        <div className={styles.container_top}>
          <div>
            <Scores />
            <div className={styles.container_top_buttons}>
              <BlueButton width={144} svg={FileSvg}>
                Export reports
              </BlueButton>
              <BlueButton width={144} svg={TaskSvg}>
                Assign Task
              </BlueButton>
              <BlueButton width={136} svg={TaskSvg}>
                Agenda
              </BlueButton>
            </div>
          </div>
          <div>
            <Location />
            <BlueButton width={204} svg={AlarmSvg}>
              Assign Emergency Services
            </BlueButton>
          </div>
          <CameraView />
          <PriceStatistics />
        </div>
        <div className={styles.container_middle}>
          <Map />
          <Conversation />
        </div>
        <div className={styles.container_bottom}>
          <Tools />
          <TrafficViolation />
          <Health />
        </div>
        {/* <div className={styles.container_top}>
          <div className={styles.container_top_rows}>
            <div className={styles.container_top_rows_firstRow}>
              <Scores />
              <div className={styles.container_top_rows_firstRow_buttons}>
                <BlueButton width={164} svg={FileSvg}>
                  Export reports
                </BlueButton>
                <BlueButton width={164} svg={TaskSvg}>
                  Assign Task
                </BlueButton>
                <BlueButton width={136} svg={TaskSvg}>
                  Agenda
                </BlueButton>
              </div>
            </div>

            <div className={styles.container_top_rows_secondRow}>
              <Location />
              <BlueButton width={250} svg={AlarmSvg}>
                Assign Emergency Services
              </BlueButton>
            </div>

            <div>
              <CameraView />
            </div>
          </div>
          <div>
            <Map />
          </div>
          <div className={styles.container_bottom_left}>
            <Tools />
            <TrafficViolation />
            <Health />
          </div>
        </div>

        <div className={styles.container_top_rows_fourthRow}>
          <Conversation />
        </div> */}
      </div>
      <div className={styles.other_content_block}>
        <Navigation />
      </div>
    </section>
  );
};

export default Home;
