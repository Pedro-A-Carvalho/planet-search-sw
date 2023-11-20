import { useState, useEffect } from 'react';
import PlanetsContext, { Planet, PlanetAPI } from './PlanetsContext';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);
  const [filteredColumns, setFilteredColumns] = useState<string[]>([]);
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

  const context = {
    planets,
    filteredPlanets,
    filteredColumns,
    setFilteredColumns,
    setFilteredPlanets,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
