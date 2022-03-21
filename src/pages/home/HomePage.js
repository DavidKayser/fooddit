import React from 'react';
import './HomePage.css';
import Reddits from '../../features/reddits/Reddits'; 

const HomePage = () => {
    return (
        <div id="home-page" className="page">
            <Reddits />
        </div>
    );
}

export default HomePage;