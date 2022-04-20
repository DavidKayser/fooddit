import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import Sidebar from './Categories';


describe("<Sidebar />", () => {
    it("Renders <Sidebar /> component correctly", () => {
        render(<Provider store={store}><Sidebar /></Provider>);
        expect(
          screen.getByText(/filter/i)
        ).toBeInTheDocument();
    });

    it("hides/shows the filter list on click", () => {
        render(<Provider store={store}><Sidebar /></Provider>);
        const button = screen.getByText(/thai/i);
        fireEvent.click(button);
        expect(screen.getByText(/japanese/)).toHaveClass('inactive');
        fireEvent.click(button);
        expect(screen.getByText(/japanese/)).not.toHaveClass('inactive');
    })

  });