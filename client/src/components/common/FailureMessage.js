import React from "react";
import styled, {keyframes} from "styled-components";
import PropTypes from 'prop-types';

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const MessageContainer = styled.div`
  bottom : 0;
  right : 0;
  position : absolute;
  background : red;
  color : white;
  border-radius : 5px;
  padding : 5px 10px;
  margin : 15vh 2vw;
  z-index : 3;
  box-shadow: 5px 10px 18px #888888;
  /* Animation */
  animation: ${BounceAnimation} 1s linear infinite;
  animation-delay: ${props => props.delay};
`;

const Message = styled.p`
  font-size : 1vmax;
  font-weight : bold;
  padding : 0px 0px;
`;

class FailureMessage extends React.Component {
  render() {
    return (
      <MessageContainer>
        <Message>
            {this.props.message} Failed !
        </Message>
      </MessageContainer>
    )
  }
}

FailureMessage.propTypes = {
    message: PropTypes.string.isRequired,
}
  
FailureMessage.defaultProps = {
    message: 'text'
}

export default FailureMessage;