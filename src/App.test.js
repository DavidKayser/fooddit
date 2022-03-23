import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './app/App';

describe("<App />", () => {
  it("Renders <App /> component correctly", () => {
    render(<Provider store={store}><App /></Provider>);
    expect(
      screen.getByText(/popular/i)
    ).toBeInTheDocument();
  });
});