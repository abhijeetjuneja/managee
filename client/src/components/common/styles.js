import styled, { keyframes }  from 'styled-components';

export const Search = styled.input`
  width: 130px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  padding: 8px 20px;
  color:grey;
  &:focus{
    width: 50%;
  }
`;
