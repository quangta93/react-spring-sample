import React, { useState, useReducer } from 'react';
import { useTransition, animated } from 'react-spring';
import { AlertItem } from './AlertItem';
import { reducer, initialState, dismiss, announce } from './alert';


const TIMEOUT_DURATION = 3000;

export const ConnectedQueue = (
  {
    testId,
    alerts = [],
    dismiss = () => {},
    timeout = TIMEOUT_DURATION,
  }
) => {
  const [alertRefs] = useState(new WeakMap());

  const dismissItem = (item) => {
    alertRefs.delete(item);
    dismiss(item.id);
  };

  const transitions = useTransition(alerts, item => item.id, {
    from: {
      opacity: 0,
      height: 0,
    },
    enter: item => async next => await next({
      opacity: 1,
      height: alertRefs.get(item).offsetHeight + 15,
    }),
    leave: {
      opacity: 0,
      height: 0,
    },
    onRest: item => setTimeout(() => dismissItem(item), timeout),
  });

  return (
    <div data-testid={testId}>
      {transitions.map(
        ({ item, key, props }) => (
          <animated.div key={key} style={props}>
            <AlertItem
              {...item}
              ref={ref => alertRefs.set(item, ref)}
              onClose={() => dismissItem(item)}
            />
          </animated.div>
        )
      )}
    </div>
  );
};

export const AlertQueue = (props) => {
  const [alerts, dispatch] = useReducer(reducer, initialState);
  const [message, setMessage] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(announce(message));
    setMessage('');
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Add Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit" onClick={onSubmit}>Add Message</button>
      </form>

      <ConnectedQueue
        {...props}
        alerts={alerts}
        dismiss={id => dispatch(dismiss(id))}
      />
    </div>
  );
}
