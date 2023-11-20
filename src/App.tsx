import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const {
    planets,
    filteredPlanets,
    filteredColumns,
    setFilteredColumns,
    setFilteredPlanets,
  } = useContext(PlanetsContext);

  useEffect(
    () => {
      if (nameFilter === '') return setFilteredPlanets(planets);
      const filterPlanets = planets.filter((planet) => (
        planet.name.toLowerCase().includes(nameFilter.toLowerCase())
      ));
      setFilteredPlanets(filterPlanets);
      setColumnFilter('');
    },
    [nameFilter, planets, setFilteredPlanets],
  );

  function filterByNumber() {
    const filterPlanets = filteredPlanets.filter((planet) => {
      const planetValue = Number(planet[columnFilter]);
      const value = Number(valueFilter);
      if (comparisonFilter === 'maior que') return planetValue > value;
      if (comparisonFilter === 'menor que') return planetValue < value;
      return planetValue === value;
    });
    setFilteredPlanets(filterPlanets);
    setFilteredColumns([...filteredColumns, columnFilter]);
    setColumnFilter(columns.filter((column) => column !== columnFilter)[0]);
  }

  return (
    <div>
      <div>
        <h1>Star Wars Planets Search</h1>
      </div>
      <div className="App-body">
        <div>
          <p>Search for your favorite Star Wars planets!</p>
          <input
            type="text"
            data-testid="name-filter"
            value={ nameFilter }
            onChange={ (e) => setNameFilter(e.target.value) }
          />
        </div>
        <div>
          <p>Click on a column to sort it!</p>
          <select
            data-testid="column-filter"
            onChange={ (e) => setColumnFilter(e.target.value) }
          >
            { columns.map((column) => {
              if (filteredColumns.includes(column)) return null;
              return <option key={ column } value={ column }>{ column }</option>;
            })}
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ (e) => setComparisonFilter(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="number"
            data-testid="value-filter"
            value={ valueFilter }
            onChange={ (e) => setValueFilter(e.target.value) }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ filterByNumber }
          >
            Filtrar
          </button>
        </div>
      </div>
      <Table />
    </div>
  );
}

export default App;
