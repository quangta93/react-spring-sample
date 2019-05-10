import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import styled from 'styled-components';


const useMessages = () => {
  const [messages, set] = useState([]);

  const add = () => {
    const text = lorem();
    set(list => [...list, { id: id(), text }]);
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

const Message = styled(animated.div)`
  width: 200px;
  height: auto;
  padding: 12px;
  font-size: 1rem;
  border-radius: 4px;
  color: white;
  background-color: #445159;
  margin-top: 15px;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageQueue = ({ messages, remove }) => {
  const [refMap] = useState(() => new WeakMap());
  // const [cancelMap] = useState(() => new WeakMap());

  const transitions = useTransition(
    messages,
    msg => msg.id,
    {
      from: { height: 0 },
      enter: msg => async next => await next({
        height: refMap.get(msg).offsetHeight,
      }),
      // leave: msg => async (next, cancel) => {
      //   // cancelMap.set(msg, cancel);
      //   await next({ height: 0 });
      // },
      leave: { height: 0 },
      onRest: () => console.log('animation stopped'),
    },
  );

  return (
    <Queue>
      {transitions.map(
        ({ item, key, props }) => (
          <div
            key={key}
            style={{ height: props.height }}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();

              remove(item.id);
            }}
          >
            <Message ref={ref => refMap.set(item, ref)}>
              {item.id}
              <br/>
              {item.text}
            </Message>
          </div>
        )
      )}
    </Queue>
  );
};

const Sentences = [
  'jQuery is a chain of creating user interfaces based on the increasing speed of objects to help run both in or included from HTML pages.',
  'Currying is a child function.',
  'Closure is an ecosystem for a function with first-class functions, making the majority of page refresh.',
  'Passport.',
  'Arity is a package manager with a function calls by a JavaScript code can be easily referenced.',
]

const lorem = () => Sentences[Math.floor(Math.random() * 5)];
const id = () => `_${Math.random().toString(36).slice(2, 9)}`;

export default () => {
  const { messages, add, remove } = useMessages();

  return (
    <Container onClick={add}>
      Click here to add messages

      <MessageQueue messages={messages} remove={remove} />
    </Container>
  )
}