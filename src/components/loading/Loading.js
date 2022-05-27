import React from 'react';
import './Loading.css';

export const Loading = () => {
    const loadingArticle = (
        <article className="reddit-loading-article masonry-item">
            <div className="reddit-loading-header"><p>LOADING...</p></div>
            <div className="reddit-loading-image">
                <div className="reddit-loading-icon"></div>
                <div className="reddit-loading-icon"></div>
                <div className="reddit-loading-icon"></div>
            </div>
            <div className="reddit-loading-footer"><p>LOADING...</p></div>
        </article>
    );
    return(
        <>
            {loadingArticle}
            {loadingArticle}
        </>
    );
}
