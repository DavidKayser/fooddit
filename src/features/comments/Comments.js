import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectReddits } from "../../features/reddits/redditsSlice";
import { selectComments, loadComments } from "../../features/comments/commentsSlice";
import "./Comments.css";

const Comments = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const reddits = useSelector(selectReddits);
    const comments = useSelector(selectComments);
    const getReddit = reddits.filter(reddit => reddit.id === id);
    const singleReddit = getReddit[0];
    const commentsLink = singleReddit.singleLink;

    useEffect(() => {
        dispatch(loadComments(`${commentsLink}.json`));
    }, [dispatch]);
    
    return (
        <section className="Comments">
            <h3 id="comments-title">Comments</h3>
            <ul className="comments-list">
            {Object.values(comments).map((comment, index) => (
                    <article className="comments" key={index}>
                        <div className="comment-header">
                            <p className="float-left">{comment.name}</p>
                            <p className="float-left">{comment.postedOn}</p>
                        </div>
                        <p>{comment.comment}</p>
                        <div className="comment-footer">
                            <p className="float-left">{comment.upVotes}</p>
                            <p className="float-left">{comment.downVotes}</p>
                        </div>
                    </article>
                ))}
            </ul>
        </section>
    );
}

export default Comments;