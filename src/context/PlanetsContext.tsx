import { createContext } from 'react';

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  url: string;
  created: string;
  edited: string;
};

export type PlanetAPI = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

export type Filters = {
  column: string;
  comparison: string;
  value: string;
};

type PlanetsContextType = {
  planets: Planet[];
  filteredPlanets: Planet[];
  filterByNumericValues: Filters[];
  setFilterByNumericValues: (filters: Filters[]) => void;
  setFilteredPlanets: (planets: Planet[]) => void;
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
