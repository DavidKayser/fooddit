import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectReddits, selectSingleReddit, loadReddits, resetSingleReddit } from "./redditsSlice";
import Comments from "../comments/Comments";
import "./RedditSingle.css";

const RedditSingle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id, title } = useParams();
    const reddits = useSelector(selectReddits);
    const single = useSelector(selectSingleReddit);
    let singleReddit;
    const getReddit = reddits.filter(reddit => reddit.id === id);
    if (reddits.length > 0 && getReddit.length > 0) {
        singleReddit = getReddit[0];
    } else {
        singleReddit = single;
    }
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        if (reddits.length <= 0) {
            console.log("single");
            dispatch(loadReddits({link: `/r/food/comments/${id}/${title}.json`, queryType: "single"}));
        }
    }, [id, title, reddits.length, dispatch]);

    function onDismiss(event) {
        event.preventDefault();
        
        if(event.target === event.currentTarget) {
            document.body.style.overflow = 'unset';
            dispatch(resetSingleReddit());

            if (reddits.length <= 0) {
                navigate("/");
                return;
            }
            navigate(-1);
            console.log("clear");
        }
    }
    
    return (
        <div>
            <div onClick={(event) => onDismiss(event)} className="overlay" data-testid="overlay">
            <section className="modal">
            {singleReddit && (
                <article className="reddit-article">
                    <div className="reddit-header">
                        <p className="float-left community">{singleReddit.subreddit}</p>
                        <p className="float-left">Posted by {singleReddit.author}</p>
                        <p onClick={(event) => onDismiss(event)} className="float-right close-modal">x</p>
                    </div>
                    <h3>{singleReddit.title}</h3>
                    <div className="reddit-body">
                        <img className="reddit-portrait-image" src={singleReddit.media} alt="media" />
                        <img className="reddit-image" src={singleReddit.media} alt="media" />
                    </div>
                    <div className="reddit-footer">
                        <p className="float-left">{singleReddit.upvotes} upvotes</p>
                        <p className="float-left">{singleReddit.numberOfComments} Comments</p>
                        <p className="float-left">{singleReddit.postedOn}</p>
                    </div>
                    <Comments commentsLink={singleReddit.singleLink} />
                </article>
            )}
            </section>
            </div>
        </div>
    );
}

export default RedditSingle;