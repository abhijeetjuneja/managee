import styled  from 'styled-components';

export const Button = styled.button`
  color: ${props => props.textColor ? props.textColor : 'black'};
  background: ${props => props.backColor ? props.backColor : 'white'};
  font-weight:bold;
  text-align:center;
  font-size: 1.4vmax;
  padding : 10px;
  border-radius : 5px;
  border : 2px solid ${props => props.backColor ? props.backColor : 'white'}; 
  &:hover {
      background: ${props => props.textColor ? props.textColor : 'black'};
      color: ${props => props.backColor ? props.backColor : 'white'};
      cursor:pointer;
  }; 
`;
