import React from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectReddits, loadReddits, selectNextToLoad } from "./redditsSlice";
import "./Reddits.css";
import { useState, useEffect } from "react";

const RedditSingle = () => {
    const dispatch = useDispatch();
    const reddits = useSelector(selectReddits);
    const nextToLoad = useSelector(selectNextToLoad);
    const location = useLocation();
    let { category } = useParams();
    const [loadMore, setLoadMore] = useState([""]);

    useEffect(() => {
        if(category) {
            dispatch(loadReddits(`r/food/search.json?q=${category}&restrict_sr=1&sr_nsfw=`));

        } else {
            dispatch(loadReddits(`r/food.json?after=${nextToLoad}`));
        }    

    });
    //set path for link
    function articleRoute(title, id, loadNext) {
        const cleanTitle = title.replace(/[^a-zA-Z0-9-_]/g, '');
        const nextIndex = loadMore.indexOf(loadNext);
        if (nextIndex > 1) {
            const getReddit = nextIndex - 1;
            return `/${loadMore[getReddit]}/${id}/${cleanTitle}`
        }
        return `/${id}/${cleanTitle}`
    }

    return (
        <>
        {reddits.map((reddit, index) => (
            <article className="reddits-article" key={index}>
                <div className="reddit-header">
                    <p className="float-left community">{reddit.subreddit}</p>
                    <p className="float-left">Posted by {reddit.author}</p>
                </div>
                <Link data-testid="single-link" to={articleRoute(reddit.title, reddit.id, reddit.loadNext)} state={{ backgroundLocation: location }}> 
                    <div className="reddits-body">  
                        <h3 className="reddits-title">{reddit.title}</h3>
                        <img className="reddits-image" src={reddit.media} alt="media" />
                    </div>
                </Link>
                {reddit.mediaType === "link" && (
                    <a href={reddit.media} target="_blank" rel="noreferrer">LINK</a>
                )}
                <div className="reddit-footer">
                    <p className="float-left">{reddit.upvotes} upvotes</p>
                    <p className="reddits-comments-icon float-left">{reddit.numberOfComments} Comments</p>
                    <p className="float-left">{reddit.postedOn}</p>
                </div>
            </article>
        ))}
        </>

    );
}

export default RedditSingle;