import React, { useState } from 'react';
import {
  StyledCircuitBox,
  StyledCircuitList,
  StyledDataCard,
  StyledRackContainment,
} from './Layout.styles';
import { useSpring, animated } from 'react-spring';


const racks = [
  { id: 1, circuits: ['TRC.06.01', '06.011.1', '06.011.4', '06.011.2'] },
  { id: 2, circuits: ['06.012.3', '06.012.1', '06.012.3', '06.012.2'] },
  { id: 3, circuits: ['06.013.3', '06.013.1', '06.013.3', '06.013.2'] },
  { id: 4, circuits: ['06.014.3', '06.014.1', '06.014.3', '06.014.2'] },
  { id: 5, circuits: ['06.015.3', '06.015.1', '06.015.3', '06.015.2'] },
];

const CircuitBox = ({ name, selected, onClick }) => {
  const boxStyle = useSpring({
    backgroundColor: selected ? 'lightgray' : 'white',
  });

  const nameStyle = useSpring({
    fontWeight: selected ? 'bold' : 'normal',
  });

  return (
    <div onClick={onClick}>
      <StyledCircuitBox selected={selected} style={boxStyle} />

      <animated.span style={nameStyle}>
        {name}
      </animated.span>
    </div>
  );
};

const DataCard = ({ style, name, color }) => (
  <StyledDataCard style={{ ...style, color }}>
    <strong style={{ fontSize: 20 }}>
      { name } Data
    </strong>
  </StyledDataCard>
);

const useRack = () => {
  const [rack, selectRack] = useState(null);
  const set = id => selectRack(
    (rack === id) ? null : id
  );

  return [rack, set];
}

export const Layout = () => {
  const [rack, selectRack] = useRack();

  const mainCardStyle = useSpring({
    opacity: rack ? 0 : 1,
    height: rack ? 0 : 200,
  });

  const circuitCardStyle = useSpring({
    opacity: rack ? 1 : 0,
    height: rack ? 200 : 0,
  });

  const selectedRack = racks.find(({ id }) => (id === rack));

  return (
    <StyledRackContainment>
      {/* DPA */}
      <div style={{ color: 'red' }}>
        <StyledCircuitList>
          {
            racks.map(
              ({ id, circuits }) =>
                <CircuitBox
                  key={circuits[0]}
                  name={circuits[0]}
                  selected={id === rack}
                  onClick={() => selectRack(id)}
                />
            )
          }
        </StyledCircuitList>
        <DataCard
          style={circuitCardStyle}
          color="red"
          name={selectedRack && selectedRack.circuits[0]}
        />

        <StyledCircuitList>
          {
            racks.map(
              ({ id, circuits }) =>
                <CircuitBox
                  key={circuits[1]}
                  name={circuits[1]}
                  selected={id === rack}
                  onClick={() => selectRack(id)}
                />
            )
          }
        </StyledCircuitList>
        <DataCard
          style={circuitCardStyle}
          color="red"
          name={selectedRack && selectedRack.circuits[1]}
        />

        <DataCard
          style={mainCardStyle}
          color="red"
          name="A-side Main"
        />
      </div>

      {/* DPB */}
      <div style={{ color: 'blue' }}>
        <StyledCircuitList>
          {
            racks.map(
              ({ id, circuits }) =>
                <CircuitBox
                  key={circuits[2]}
                  name={circuits[2]}
                  selected={id === rack}
                  onClick={() => selectRack(id)}
                />
            )
          }
        </StyledCircuitList>
        <DataCard
          style={circuitCardStyle}
          color="blue"
          name={selectedRack && selectedRack.circuits[2]}
        />

        <StyledCircuitList>
          {
            racks.map(
              ({ id, circuits }) =>
                <CircuitBox
                  key={circuits[3]}
                  name={circuits[3]}
                  selected={id === rack}
                  onClick={() => selectRack(id)}
                />
            )
          }
        </StyledCircuitList>
        <DataCard
          style={circuitCardStyle}
          color="blue"
          name={selectedRack && selectedRack.circuits[3]}
        />

        <DataCard
          style={mainCardStyle}
          color="blue"
          name="B-side Main"
        />
      </div>
    </StyledRackContainment>
  );
}
