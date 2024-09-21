import styled from "styled-components";
import { COLORS } from "../../constants/scss/COLORS";

interface StyledButtonProps {
  width?: number;
}

interface ButtonProps extends StyledButtonProps {
  svg: string;
  children: React.ReactNode;
}

const BlueStyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  background: ${COLORS.BLUE_GRADIENT_SECONDARY};
  color: white;

  width: ${(props) => (props.width ? `${props.width}px` : "164px")};
  height: 46px;
  border: none;
  border-radius: 8px;

  font-size: 11px;
  font-family: Inter;
  font-weight: 600;

  opacity: 1;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  transition: all 300ms ease-in-out;
  &:hover {
    opacity: 0.6;
  }
`;

export const BlueButton = ({ width, svg, children }: ButtonProps) => {
  return (
    <BlueStyledButton width={width}>
      <img src={svg} alt="File" />
      {children}
    </BlueStyledButton>
  );
};
