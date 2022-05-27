import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './app/App';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation } from 'react-router-dom';

describe("<App />", () => {
  it("Renders <App /> component correctly", () => {
    render(<Provider store={store}><Router><App /></Router></Provider>);
    expect(
      screen.getByText(/Filters/i)
    ).toBeInTheDocument();
  });
});
