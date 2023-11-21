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
  const [whichColumn, setWhichColumn] = useState('population');
  const [columnOrder, setColumnOrder] = useState('ASC');
  const {
    planets,
    filteredPlanets,
    filterByNumericValues,
    setFilterByNumericValues,
    setFilteredPlanets,
  } = useContext(PlanetsContext);

  useEffect(
    () => {
      if (filterByNumericValues.length !== 0) setFilterByNumericValues([]);
      // corrigir esse bug aqui
      if (nameFilter === '') return setFilteredPlanets(planets);
      const filterPlanets = planets.filter((planet) => (
        planet.name.toLowerCase().includes(nameFilter.toLowerCase())
      ));
      setFilteredPlanets(filterPlanets);
      setColumnFilter('');
    },
    [nameFilter, planets, setFilteredPlanets, setFilterByNumericValues],
  );

  function filterByNumber() {
    // const filterPlanets = filteredPlanets.filter((planet) => {
    //   const planetValue = Number(planet[columnFilter]);
    //   const value = Number(valueFilter);
    //   if (comparisonFilter === 'maior que') return planetValue > value;
    //   if (comparisonFilter === 'menor que') return planetValue < value;
    //   return planetValue === value;
    // });
    // setFilteredPlanets(filterPlanets);
    const newFilter = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    setFilterByNumericValues([...filterByNumericValues, newFilter]);
    setColumnFilter(columns.filter((column) => {
      const filteredCols = filterByNumericValues.map((filter) => filter.column);
      return !filteredCols.includes(column) && column !== newFilter.column;
    })[0]);
  }

  function orderPlanets() {
    console.log('orderPlanets');
    console.log(whichColumn);
    console.log(columnOrder);
    console.log(filteredPlanets);
    let filterPlanets = [...filteredPlanets];
    filterPlanets = filterPlanets.sort((a, b) => {
      const column = whichColumn;
      const order = columnOrder === 'ASC' ? 1 : -1;
      if (a[column] === 'unknown') return 1;
      if (b[column] === 'unknown') return -1;
      if (Number(a[column]) > Number(b[column])) return order;
      if (Number(a[column]) < Number(b[column])) return -order;
      return 0;
    });
    console.log(filterPlanets);
    setFilteredPlanets(filterPlanets);
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
              const filteredCols = filterByNumericValues.map((filter) => filter.column);
              if (filteredCols.includes(column)) return null;
              return (
                <option key={ column } value={ column }>{ column }</option>
              );
            }) }
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
        <div>
          { filterByNumericValues.map((filter) => (
            <div data-testid="filter" key={ filter.column }>
              <p>
                { filter.column }
                {' '}
                { filter.comparison }
                {' '}
                { filter.value }
              </p>
              <button
                type="button"
                onClick={ () => setFilterByNumericValues(
                  filterByNumericValues.filter((f) => f.column !== filter.column),
                ) }
              >
                Remover filtro
              </button>
            </div>
          )) }
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => setFilterByNumericValues([]) }
          >
            Remover todas filtragens
          </button>
        </div>
        <div>
          <select
            data-testid="column-sort"
            onChange={ (e) => setWhichColumn(e.target.value) }
          >
            { columns.map((column) => (
              <option key={ column } value={ column }>{ column }</option>
            )) }
          </select>
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            name="column-sort"
            id="column-sort-input-asc"
            value="ASC"
            onChange={ (e) => setColumnOrder(e.target.value) }
          />
          <label htmlFor="column-sort-input-asc">ASC</label>
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            name="column-sort"
            id="column-sort-input-desc"
            value="DESC"
            onChange={ (e) => setColumnOrder(e.target.value) }
          />
          <label htmlFor="column-sort-input-desc">DESC</label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ orderPlanets }
          >
            Ordenar
          </button>
        </div>
      </div>
      <Table />
    </div>
  );
}

export default App;
