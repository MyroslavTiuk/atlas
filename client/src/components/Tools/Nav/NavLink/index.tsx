import { BlackBorderedSpace } from "../../../BlackBorderedSpace";
import { NavLink } from "react-router-dom";

import Arrow from "../../../../assets/Arrow.svg";

import styles from "./style.module.scss";

type Props = {
  link: string;
  svg: string;
  text: string;
};

const NavLinkComponent = ({ link, svg, text }: Props) => {
  return (
    <BlackBorderedSpace width={199} height={14}>
      <NavLink to={link} className={styles.container}>
        <div className={styles.container_text}>
          <img src={svg} alt="" />
          <div>{text}</div>
        </div>
        <img
          src={Arrow}
          alt=""
          className={styles.container_arrow}
          width={16}
          height={16}
        />
      </NavLink>
    </BlackBorderedSpace>
  );
};

export default NavLinkComponent;
