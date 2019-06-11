import styled from 'styled-components';


export const StyledCircuitBox = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #333;
  background-color: ${props => props.selected ? 'lightgray' : 'white'}
`;

export const StyledCircuitList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-content: space-between;
  margin: 30px;
`;

export const StyledMainDataCard = styled.div`
  height: 350px;
  border: 1px solid #333;
  margin: 30px;
`;

export const StyledRackContainment = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 2fr;
`;
