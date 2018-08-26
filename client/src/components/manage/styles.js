import styled from 'styled-components';


export const OperationsContainer = styled.div`
    background-color: white;
    text-align : center;
    min-height : 70vh;
    margin : 5vh 20vw;
    @media (max-width: 768px) {
        margin : 0vh 0vh ;
    }
    @media (max-width: 768px) {
        padding : 5vh 0vh;
    }
`;

export const OperationsTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    background-color: #E7E6E6;
`;

export const OperationsRow = styled.tr`
    
`;

export const OperationsHead = styled.th`
    padding : 2vh 2vw !important;
    text-align: left;
    border-bottom: 1px solid #ddd;
    background : #68069C;
    color : white;
`;

export const OperationsEntry = styled.td`
    padding : 4vh 2vw !important;
    text-align: left;
    border-bottom: 1px solid #ddd;
`;

export const OperationsLink = styled.a`
    padding : 5px 5px;
    color : #BA7AFE;
    &:hover {
        cursor : pointer;
        color : black;
    }
`;

export const AddUserContainer = styled.div`
    background-color: white;
    text-align : center;
    padding : 5vh 0vh;
`;

