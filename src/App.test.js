import React from 'react';
import { random } from 'faker';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { wait, waitForElementToBeRemoved } from 'dom-testing-library';

import { AlertQueue } from './App';


describe('AlertQueue', () => {
  test('renders without throwing error', () => {
    expect(() => render(<AlertQueue />)).not.toThrow();
  });

  test('renders nothing if store is empty', () => {
    const testId = random.word();

    const { getByTestId } = render(
      <AlertQueue testId={testId} />
    );

    expect(getByTestId(testId)).toBeEmpty();
  });

  test('renders correct message', async () => {
    const {
      getByText,
      getByPlaceholderText,
      getByDisplayValue,
    } = render(<AlertQueue />);

    const message = random.words();

    fireEvent.change(getByPlaceholderText('Add Message'), { target: { value: message }});

    await waitForElement(() => getByDisplayValue(message));

    fireEvent.click(getByText('Add Message'));

    await waitForElement(() => getByText(message));
  });

  test('dismisses alert after an amount of time', async () => {
    const w = render(<AlertQueue timeout={0} />);

    const message = random.words();

    fireEvent.change(w.getByPlaceholderText('Add Message'), { target: { value: message }});

    await wait(() => expect(w.getByDisplayValue(message)).toBeInTheDocument());

    fireEvent.click(w.getByText('Add Message'));

    await wait(() => expect(w.getByText(message)).toBeInTheDocument());

    await waitForElementToBeRemoved(() => w.getByText(message));
  });
});