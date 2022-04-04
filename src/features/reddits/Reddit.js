import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectReddits, selectIsLoading, loadReddits } from "./redditsSlice";
import Comments from "../comments/Comments";
import './Reddit.css';

const Reddit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const reddits = useSelector(selectReddits);
    const getReddit = reddits.filter(reddit => reddit.id === id);
    const singleReddit = getReddit[0];

    // useEffect(() => {
    //     dispatch(loadReddits(`r/food/search.json?q=${termCleaned}&restrict_sr=1&sr_nsfw=`));
    // });

    function onDismiss() {
        navigate(-1);
    }
    
    return (
        <div>
            <div onClick={() => onDismiss()} className="overlay" data-testid="overlay"></div>
            <section className="modal">
                {singleReddit && (
                <article className="reddit-article">
                    <div className="reddit-header">
                        <p className="float-left community">{singleReddit.subreddit}</p>
                        <p className="float-left">Posted by {singleReddit.author}</p>
                    </div>
                    <h3>{singleReddit.title}</h3>
                    {singleReddit.mediaType === "image" && (
                        <img className="reddit-image" src={singleReddit.media} alt="media" />
                    )}
                    {singleReddit.mediaType === "link" && (
                        <a href={singleReddit.media} target="_blank" rel="noreferrer">LINK</a>
                    )}
                    <div className="reddit-footer">
                        <p className="float-left">{singleReddit.upvotes} upvotes</p>
                        <p className="float-left">{singleReddit.numberOfComments} Comments</p>
                        <p className="float-left">{singleReddit.postedOn}</p>
                    </div>
                    <Comments />
                </article>
                )}
            </section>
        </div>
    );
}

export default Reddit;