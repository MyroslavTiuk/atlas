import styled from "styled-components";

type GradientButtonProps = {
  height?: number;
  width?: number;
  radius?: number;
};

export const GradientButton = styled.button<GradientButtonProps>`
  background: linear-gradient(to left, #fea986, #ff7fc1, #b57efa);
  height: ${(props) => (props.height ? `${props.height}` : "44")}px;
  width: ${(props) => props.width && `${props.width}px`};
  border-radius: ${(props) => (props.radius ? props.radius : 8)}px;
  color: white;
  font-family: Inter;
  font-size: 10px;
  font-weight: 600;
  border: none;
  opacity: 1;
  cursor: pointer;

  transition: all 300ms ease-in-out;
  &:hover {
    opacity: 0.6;
  }
`;
