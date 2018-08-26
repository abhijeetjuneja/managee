import React from "react";
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div`
  height : 20px;
  display: flex;
  align-items: flex-end;
  text-align : center;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  background-color: black;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  margin: 0 5px;

  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;

class Loader extends React.Component {
  render() {
    return (
      <DotWrapper>
        <Dot delay="0s" />
        <Dot delay=".1s" />
        <Dot delay=".2s" />
      </DotWrapper>
    )
  }
}

export default Loader;