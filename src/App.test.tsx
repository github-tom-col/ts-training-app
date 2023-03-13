import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const squares = Array(9).fill(null);

function handleClick(index: number) {
  console.log("Square", index, "was clicked");
}

test('renders learn react link', () => {
  render(<App squares={squares} onClick={handleClick} dimension={3} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
