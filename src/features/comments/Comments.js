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

    function loadSubComments(item, depth) {
        let commentDepth = depth;
        commentDepth ++;
        if(item.subComments) {
            const subComment = Object.values(item.subComments).map((comment, index) => (
                <ul className="comment-group sub-comments" key={index}>
                    <li>
                    <article className="comments sub-comment" >   
                        <div className="comment-header">
                            <p className="float-left">{comment.name}</p>
                            <p className="float-left">{comment.postedOn}</p>
                        </div>
                        <p>{comment.body}</p>
                        <div className="comment-footer">
                            <p className="float-left">{comment.upVotes}</p>
                            <p className="float-left">{comment.downVotes}</p>
                        </div>
                    </article>
                    </li>
                    {comment.subComments.length > 0 && (
                    <li>{loadSubComments(comment, commentDepth)}</li>
                    )}
                </ul>
            ))
            return subComment;
        } else {
            return;
        }
    }
    
    return (
        <section className="Comments">
            <h3 id="comments-title">Comments</h3>
            <div className="comments-list">
            {comments &&
            Object.values(comments).map((comment, index) => (
                <ul className="comment-group" key={index}>
                    <li>
                        <article className="comments" >
                            <div className="comment-header">
                                <p className="float-left">{comment.name}</p>
                                <p className="float-left">{comment.postedOn}</p>
                            </div>
                            <p>{comment.body}</p>
                            <div className="comment-footer">
                                <p className="float-left">{comment.upVotes}</p>
                                <p className="float-left">{comment.downVotes}</p>
                            </div>
                        </article>
                    </li>
                    {comment.subComments.length > 0 && (
                    <li>{loadSubComments(comment, 0)}</li>
                    )}
                </ul>
                ))}
            </div>
        </section>
    );
}

export default Comments;