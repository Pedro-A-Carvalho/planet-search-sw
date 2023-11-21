import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlanetsProvider from './context/PlanetsProvider';

const renderWithProvider = (ui: JSX.Element) => {
//   window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: PlanetsProvider }),
  };
};

export default renderWithProvider;
