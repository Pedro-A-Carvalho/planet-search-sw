import { useState, useEffect } from 'react';
import PlanetsContext, { Filters, Planet, PlanetAPI } from './PlanetsContext';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState<Filters[]>([]);

  const fetchPlanets = async () => {
    const data = await fetch('https://swapi.dev/api/planets');
    const { results } = await data.json();
    const resultsWOResidents = results.map((planet: PlanetAPI) => {
      const {
        name,
        rotation_period: rotationPeriod,
        orbital_period: orbitalPeriod,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water: surfaceWater,
        population,
        films,
        url,
        created,
        edited,
      } = planet;
      return {
        name,
        rotation_period: rotationPeriod,
        orbital_period: orbitalPeriod,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water: surfaceWater,
        population,
        films,
        url,
        created,
        edited,
      };
    });
    setPlanets(resultsWOResidents);
    setFilteredPlanets(resultsWOResidents);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    function filter() {
      const newPlanets = planets.filter((planet) => {
        let valid = true;
        filterByNumericValues.forEach((rule) => {
          const { column, comparison, value } = rule;
          const planetValue = Number(planet[column as keyof Planet]);
          const filterValue = Number(value);
          if (valid && (comparison === 'maior que')) valid = planetValue > filterValue;
          if (valid && (comparison === 'menor que')) valid = planetValue < filterValue;
          if (valid && (comparison === 'igual a')) valid = planetValue === filterValue;
        });
        return valid;
      });
      setFilteredPlanets(newPlanets);
    }

    filter();
  }, [filterByNumericValues, planets]);

  const context = {
    planets,
    filteredPlanets,
    filterByNumericValues,
    setFilterByNumericValues,
    setFilteredPlanets,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
