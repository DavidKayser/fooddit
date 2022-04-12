import React from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import './Loading.css';

export const Loading = () => {
    return(
        <article className="reddit-loading-article">
            <div className="reddit-loading-header"><p>LOADING...</p></div>
            <div className="reddit-loading-image">
                <div className="reddit-loading-icon"></div>
                <div className="reddit-loading-icon"></div>
                <div className="reddit-loading-icon"></div>
            </div>
            <div className="reddit-loading-footer"><p>LOADING...</p></div>
        </article>
    );
}