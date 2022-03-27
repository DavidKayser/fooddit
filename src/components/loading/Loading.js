import React from 'react';
import './Loading.css';

export const Loading = () => {
    return(
        <div className="loading">
            <div id="main-ball"></div>
            <div className="ball-one"></div>
            <div className="ball-two"></div>
            <div className="ball-three"></div>
        </div>
    );
}