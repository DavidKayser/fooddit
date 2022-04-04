import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectReddits, selectIsLoading, loadReddits } from "../../features/reddits/redditsSlice";
import { selectComments, loadComments } from "../../features/comments/commentsSlice";
import "../../features/reddits/Reddits.css";

const Comments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();
    const reddits = useSelector(selectReddits);
    const comments = useSelector(selectComments);
    const getReddit = reddits.filter(reddit => reddit.id === id);
    const singleReddit = getReddit[0];
    const commentsLink = singleReddit.singleLink;
    console.log(comments);

    useEffect(() => {
        dispatch(loadComments(`${commentsLink}.json`));
    }, [dispatch]);
    
    return (
        <section className="Comments">
            <h3 id="comments-title">Comments</h3>
            <ul className="comments-list">
            {Object.values(comments).map((comment, index) => (
                    <article className="comments" key={index}>
                        <div className="comments-header">
                            <p className="float-left">{comment.name}</p>
                        </div>
                        <p>{comment.comment}</p>
                    </article>
                ))}
            </ul>
        </section>
    );
}

export default Comments;