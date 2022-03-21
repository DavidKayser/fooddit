import React from 'react';

export const ArticleListItem = ({ article }) => {
    return(
        <article>
            <h3>{article.title}</h3>
            <img src={article.image} alt={article.title} />
            <div className="articleFooter">
                <div className="article-author">
                    <img src={article.authorImage} alt={article.authro} />
                    <p>{article.author}</p>
                </div>
                <p>{article.postedOn}</p>
                <p>{article.numberOfComments} Comments</p>
            </div>
        </article>
    );
}