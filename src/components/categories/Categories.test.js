import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import Sidebar from './Categories';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  MemoryRouter} from 'react-router-dom';


describe("<Sidebar />", () => {
    it("Renders <Sidebar /> component correctly", () => {
        render(<Provider store={store}><Router><Sidebar /></Router></Provider>);
        expect(
          screen.getByText(/filter/i)
        ).toBeInTheDocument();
    });

    it("hides/shows the filter list on click", () => {
        render(<Provider store={store}><Router><Sidebar /></Router></Provider>);
        const button = screen.getByText(/Vegetarian/i);
        fireEvent.click(button);
        expect(screen.getByText(/Vegan/)).toHaveClass('inactive');
        fireEvent.click(button);
        expect(screen.getByText(/Vegan/)).not.toHaveClass('inactive');
    })

  });
  