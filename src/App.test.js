import React from 'react';
import { random } from 'faker';
import { waitForElement } from 'react-testing-library';
import { waitForElementToBeRemoved } from 'dom-testing-library';

import { AlertQueue } from './Alert';
import { renderWithRedux } from 'testUtils';
import { announce } from 'core/alert';


describe('AlertQueue', () => {
  test('renders without throwing error', () => {
    expect(() => renderWithRedux(<AlertQueue />)).not.toThrow();
  });

  test('renders nothing if store is empty', () => {
    const testId = random.word();
    const { getByTestId } = renderWithRedux(<AlertQueue testId={testId} />);

    expect(getByTestId(testId)).toBeEmpty();
  });

  test('renders correct message', async () => {
    const { getByText, store } = renderWithRedux(<AlertQueue />);

    const message = random.words();
    const action = announce(message);
    store.dispatch(action);

    const alert = await waitForElement(() => getByText(message));
    expect(alert).toBeInTheDocument();
  });

  test('dismisses alert after an amount of time', async () => {
    const { getByText, store } = renderWithRedux(<AlertQueue timeout={0} />);

    const message = random.words();
    const action = announce(message);
    store.dispatch(action);

    await waitForElementToBeRemoved(() => getByText(message));
  });
});