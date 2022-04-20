import React from 'react';
import { Outlet } from "react-router-dom";
import './HomePage.css';
import Reddits from '../../features/reddits/Reddits'; 
import Categories from '../../components/categories/Categories'; 

const HomePage = () => {
    return (
        <div id="home-page" className="page">
            <Categories />
            <Reddits />
        </div>
    );
}

export default HomePage;