import React from 'react';
import { Outlet } from "react-router-dom";
import './HomePage.css';
import Reddits from '../../features/reddits/Reddits'; 
import Sidebar from '../../components/sidebar/Sidebar'; 

const HomePage = () => {
    return (
        <div id="home-page" className="page">
            <Reddits />
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default HomePage;