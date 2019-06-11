import styled from 'styled-components';
import { animated } from 'react-spring';


export const StyledCircuitContainer = styled.div`
  display: grid;
  justify-content: center;
`;

export const StyledCircuitBox = styled(animated.div)`
  width: 60px;
  height: 60px;
  border: 1px solid #333;
  margin-bottom: 5px;
`;

export const StyledCircuitList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-content: space-between;
  margin: 30px;
`;

export const StyledDataCard = styled(animated.div)`
  border: 1px solid #333;
  margin: 30px;
  display: grid;
  align-content: center;
  justify-content: center;
`;

export const StyledRackContainment = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 2fr;
`;
