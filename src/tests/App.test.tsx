import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithProvider from '../renderWithProvider';
import { vi } from 'vitest';
import testData from '../../cypress/mocks/testData';

// global.fetch = vi.fn().mockResolvedValue({
//   json: vi.fn().mockResolvedValue(testData);
// });

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json:() => Promise.resolve(testData),
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('check if page works', () => {
  
  test('titulo renderiza', () => {
    renderWithProvider(<App />);
    const title = screen.getByText(/Star Wars Planets Search/i);
    expect(title).toBeInTheDocument();
  })
  test('input de filtro por nome renderiza', () => {
    renderWithProvider(<App />);
    const input = screen.getByTestId('name-filter');
    expect(input).toBeInTheDocument();
  })
  test('lista renderiza corretamente', async () => {
    renderWithProvider(<App />);
    const planets = await screen.findAllByTestId('planet-name');
    expect(planets.length).toBe(10);
  })
  test('filtro de nome funciona', async () => {
    const{ user } = renderWithProvider(<App />);
    const input = screen.getByTestId('name-filter');
    await user.type(input, 'ta');
    const planets = await screen.findAllByTestId('planet-name');
    expect(planets.length).toBe(1);
  })
  test('filtro de coluna funciona', async () => {
    const{ user } = renderWithProvider(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    await user.selectOptions(columnFilter, 'population');
    const typeOfComparison = screen.getByTestId('comparison-filter');
    await user.selectOptions(typeOfComparison, 'maior que');
    const valueFilter = screen.getByTestId('value-filter');
    await user.type(valueFilter, '2000');
    const button = screen.getByTestId('button-filter');
    await user.click(button);

    const planets = await screen.findAllByTestId('planet-name');
    expect(planets.length).toBe(7);
  })
  test('botão de filtro funciona', async () => {
    const{ user } = renderWithProvider(<App />);
    const input = screen.getByTestId('column-sort');
    await user.selectOptions(input, 'population');
    const sortType = screen.getByTestId('column-sort-input-asc');
    await user.click(sortType);
    const button = screen.getByTestId('column-sort-button');
    await user.click(button);
    const planets = await screen.findAllByTestId('planet-name');
    expect(planets[0]).toHaveTextContent('Yavin IV');
  })
});
