import React from "react";
import styles from "./style.module.scss";
import Arrow from "../../assets/home/Front_arrow.svg";
import styled from "styled-components";

interface StyledProps {
  width?: number;
  height?: number;
  padding?: boolean;
  paddingTop?: boolean;
}

interface Props extends StyledProps {
  children: React.ReactNode;
  title?: string;
  seeMore?: boolean;
  svg?: string | false;
  isLoading?: boolean;
}

const StyledSection = styled.section<StyledProps>`
  max-width: ${(props) =>
    props.width ? `${props.width}px` : "fit-content"} !important;
  max-height: ${(props) => props.height && `${props.height}px`};
  width: ${(props) =>
    props.width ? `${props.width}px` : "fit-content"} !important;

  height: ${(props) => props.height && `${props.height}px`};
  padding: ${(props) => (props.padding ? "0px 16px 0px 16px" : "0px")};
`;
const HeaderDiv = styled.div<StyledProps>`
  padding: ${(props) => !props.padding && "0px 16px 0px 16px"} !important;
`;

const ComponentModal = ({
  children,
  seeMore = false,
  title,
  width,
  height,
  svg = false,
  padding = true,
  paddingTop = false,
  isLoading = false,
}: Props) => {
  return (
    <StyledSection
      className={styles.container}
      width={width}
      padding={padding}
      height={height}
    >
      {(title || seeMore) && (
        <HeaderDiv
          className={styles.container_header}
          padding={padding}
          paddingTop={paddingTop}
        >
          {title && (
            <h1>
              {svg && <img src={svg} alt="location" />} {title}
            </h1>
          )}
          {seeMore && (
            <p className={styles.container_header_seemore}>
              See More <img src={Arrow} width={16} height={16} alt="" />
            </p>
          )}
        </HeaderDiv>
      )}
      {isLoading && <>Loading</>}
      {!isLoading && children}
    </StyledSection>
  );
};

export default ComponentModal;
