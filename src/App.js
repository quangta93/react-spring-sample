import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { lorem, uid } from './helpers';


const useMessages = () => {
  const [messages, set] = useState([]);

  const add = () => {
    const text = lorem();
    set(list => [...list, { id: uid(), text }]);
  };

  const remove = id => set(list => list.filter(item => item.id !== id));

  return {
    messages,
    add,
    remove,
  }
}

const Queue = styled.div`
  position: absolute;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const MessageContent = styled.div`
  width: 200px;
  padding: 12px;
  font-size: 1rem;
  border-radius: 4px;
  color: white;
  background-color: #445159;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TIMEOUT_DURATION = 3000;

const MessageQueue = ({ messages, remove }) => {
  const [refMap] = useState(new WeakMap());

  const transitions = useTransition(
    messages,
    msg => msg.id,
    {
      from: { opacity: 0, height: 0 },
      enter: msg => async next => await next({
        opacity: 1,
        height: refMap.get(msg).offsetHeight + 15,
      }),
      leave: { opacity: 0, height: 0 },
      onRest: item => setTimeout(() => {
        refMap.delete(item);
        remove(item.id);
      }, TIMEOUT_DURATION),
    },
  );

  return (
    <Queue>
      {transitions.map(
        ({ item, key, props }) => (
          <animated.div
            key={key}
            style={props}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();

              remove(item.id);
            }}
          >
            <MessageContent ref={ref => refMap.set(item, ref)}>
              {item.id}
              <br/>
              {item.text}
            </MessageContent>
          </animated.div>
        )
      )}
    </Queue>
  );
};

export default () => {
  const { messages, add, remove } = useMessages();

  return (
    <Container onClick={add}>
      Click here to add messages

      <MessageQueue messages={messages} remove={remove} />
    </Container>
  )
}
