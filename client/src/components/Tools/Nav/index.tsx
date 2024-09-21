import NavLinkComponent from "./NavLink";

import MaintenanceSvg from "../../../assets/tools/maintenance.svg";
import TrafficSvg from "../../../assets/tools/traffic.svg";
import CrashesSvg from "../../../assets/icons/tools/Warning.svg";
import EmergencySvg from "../../../assets/tools/emergency.svg";
import CongestionSvg from "../../../assets/tools/congestion.svg";
import RoadSvg from "../../../assets/tools/road.svg";

import styles from "./style.module.scss";

type DATA_TYPE = {
  text: string;
  svg: string;
  link: string;
}[];

const MOCKED_DATA: DATA_TYPE = [
  { text: "Maintenance", svg: MaintenanceSvg, link: "/" },
  { text: "Traffic Violations", svg: TrafficSvg, link: "&traffic" },
  { text: "Car Crashes", svg: CrashesSvg, link: "&crashes" },
  { text: "Active Emergency Responders", svg: EmergencySvg, link: "/" },
  { text: "Congestion", svg: CongestionSvg, link: "/" },
  { text: "Road Work", svg: RoadSvg, link: "/" },
];

const Nav = () => {
  return (
    <div className={styles.container}>
      {MOCKED_DATA?.map((item, index) => (
        <NavLinkComponent
          key={index}
          text={item.text}
          link={item.link}
          svg={item.svg}
        />
      ))}
    </div>
  );
};

export default Nav;
