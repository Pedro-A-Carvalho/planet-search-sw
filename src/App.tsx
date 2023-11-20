import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('');
  const [valueFilter, setValueFilter] = useState('');
  const { planets, setFilteredPlanets } = useContext(PlanetsContext);

  useEffect(
    () => {
      if (nameFilter === '') return setFilteredPlanets(planets);
      const filteredPlanets = planets.filter((planet) => (
        planet.name.toLowerCase().includes(nameFilter.toLowerCase())
      ));
      setFilteredPlanets(filteredPlanets);
    },
    [nameFilter, planets, setFilteredPlanets],
  );

  function filterByNumber() {
    const filteredPlanets = planets.filter((planet) => {
      const planetValue = Number(planet[columnFilter]);
      const value = Number(valueFilter);
      if (comparisonFilter === 'maior que') return planetValue > value;
      if (comparisonFilter === 'menor que') return planetValue < value;
      return planetValue === value;
    });
    setFilteredPlanets(filteredPlanets);
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
            <option value="population">Population</option>
            <option value="orbital_period">Orbital Period</option>
            <option value="diameter">Diameter</option>
            <option value="rotation_period">Rotation Period</option>
            <option value="surface_water">Surface Water</option>
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
