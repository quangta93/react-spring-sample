import React, { useState, useReducer } from 'react';
import {
  StyledCircuitBox,
  StyledCircuitList,
  StyledMainDataCard,
  StyledRackContainment,
} from './Layout.styles';
import { range } from 'lodash';


const racks = [
  {
    id: 1,
    circuits: ['TRC.06.01', '06.011.1', '06.011.4', '06.011.2'],
  },
  {
    id: 2,
    circuits: ['06.012.3', '06.012.1', '06.012.3', '06.012.2'],
  },
  {
    id: 3,
    circuits: ['06.013.3', '06.013.1', '06.013.3', '06.013.2'],
  },
  {
    id: 4,
    circuits: ['06.014.3', '06.014.1', '06.014.3', '06.014.2'],
  },
  {
    id: 5,
    circuits: ['06.015.3', '06.015.1', '06.015.3', '06.015.2'],
  },
];

const reducer = (state, action) => {
};


const CircuitBox = ({ name, selected, onClick }) => (
  <div onClick={onClick}>
    <StyledCircuitBox selected={selected} />
    {name}
  </div>
);

export const Layout = () => {
  const [rack, selectRack] = useState(null);

  return (
    <StyledRackContainment>
      {/* DPA */}
      <div>
        <StyledCircuitList>
          {
            racks.map(
              ({ id, circuits }) =>
                <CircuitBox
                  key={circuits[0]}
                  name={circuits[0]}
                  selected={id === rack}
                  onClick={() => selectRack(rack ? null : id)}
                />
            )
          }
        </StyledCircuitList>

        <StyledCircuitList>
          {
            racks.map(
              ({ id, circuits }) =>
                <CircuitBox
                  key={circuits[1]}
                  name={circuits[1]}
                  selected={id === rack}
                  onClick={() => selectRack(rack ? null : id)}
                />
            )
          }
        </StyledCircuitList>

        <StyledMainDataCard />
      </div>

      {/* DPB */}
      <div>
        <StyledCircuitList>
          {
            racks.map(
              ({ id, circuits }) =>
                <CircuitBox
                  key={circuits[2]}
                  name={circuits[2]}
                  selected={id === rack}
                  onClick={() => selectRack(rack ? null : id)}
                />
            )
          }
        </StyledCircuitList>

        <StyledCircuitList>
          {
            racks.map(
              ({ id, circuits }) =>
                <CircuitBox
                  key={circuits[3]}
                  name={circuits[3]}
                  selected={id === rack}
                  onClick={() => selectRack(rack ? null : id)}
                />
            )
          }
        </StyledCircuitList>

        <StyledMainDataCard />
      </div>
    </StyledRackContainment>
  );
}
