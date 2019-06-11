import { uniqueId } from 'lodash';


const SHOW_ALERT = 'SHOW_ALERT';
const DISMISS_ALERT = 'DISMISS_ALERT';

export const announce = message => ({
  type: SHOW_ALERT,
  payload: {
    message,
    type: 'info',
    id: uniqueId('alert_'),
  }
});

export const dismiss = id => ({
  type: DISMISS_ALERT,
  payload: id,
});


export const initialState = [];

export const reducer = (state, { type, payload }) => {
  if (type === SHOW_ALERT) {
    return [...state, payload];
  }

  if (type === DISMISS_ALERT) {
    return state.filter(({ id }) => (id !== payload));
  }

  return state;
};
