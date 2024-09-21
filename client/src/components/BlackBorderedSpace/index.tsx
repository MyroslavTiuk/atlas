import styled from "styled-components";
import { COLORS } from "../../constants/scss/COLORS";
import Dots from "../../assets/three_dots.svg";

import styles from "./style.module.scss";

interface StyledSpaceProps {
  width?: number;
  height?: number;
  paddingTop?: boolean;
  seeMore?: boolean;
}

interface BlackBorderedSpaceProps extends StyledSpaceProps {
  children: React.ReactNode;
  title?: string;
}

const BlackStyledBorderedSpace = styled.div<StyledSpaceProps>`
  width: ${(props) =>
    props.width ? `${props.width}px` : "fit-content"} !important;
  height: ${(props) =>
    props.height ? `${props.height}px` : "fit-content"} !important;
  max-width: ${(props) =>
    props.width ? `${props.width}px` : "fit-content"} !important;
  max-height: ${(props) =>
    props.height ? `${props.height}px` : "fit-content"} !important;

  background-color: ${COLORS.BLACK_1};
  cursor: pointer;

  border: 1px solid ${COLORS.DARK_PURPLE};
  border-radius: 8px;

  padding: ${(props) =>
    props.paddingTop ? "0px 8px 0px 8px" : "8px"} !important;

  transition: all 300ms ease-in-out;
  &:hover {
    background: ${COLORS.BLACK_HOVER_1};
  }
`;

export const BlackBorderedSpace = ({
  children,
  height,
  width,
  title,
  paddingTop = false,
  seeMore = false,
}: BlackBorderedSpaceProps) => {
  return (
    <BlackStyledBorderedSpace
      height={height}
      width={width}
      paddingTop={paddingTop}
    >
      {title && (
        <div className={styles.header}>
          <p>{title}</p>
          {seeMore ? (
            <p className={styles.seeMore}>See more</p>
          ) : (
            <img src={Dots} alt="dots" width={16} height={16} />
          )}
        </div>
      )}

      {children}
    </BlackStyledBorderedSpace>
  );
};
