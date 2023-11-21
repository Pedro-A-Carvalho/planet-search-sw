import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('check if page loaded properly', () => {
  test('titulo renderiza', () => {
    render(<App />);
    const title = screen.getByText(/Star Wars Planets Search/i);
    expect(title).toBeInTheDocument();
  })
});
