import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectSingleReddit } from "../../features/reddits/redditsSlice";
import { selectComments, loadComments } from "../../features/comments/commentsSlice";
import "./Comments.css";
import { timeConverter } from "../../utils/timeConverter";

const Comments = ({commentsLink}) => {
    const dispatch = useDispatch();
    const singleReddit = useSelector(selectSingleReddit);
    const comments = useSelector(selectComments);
    const [replyToClose, setReplyToClose] = useState([]);
    
    useEffect(() => {
        if(singleReddit) {
            dispatch(loadComments(`${commentsLink}.json`));
        }
    }, [dispatch]);

    function hideComments(id) {
        if (replyToClose.includes(id)) {
            const updateReplies = replyToClose.filter(reply => reply !== id);
            setReplyToClose(updateReplies);
        } else {
            setReplyToClose(prev => [...prev, id]);
        }
    }
    
    function loadSubComments(item) {
        if(item.subComments) {
            const subComment = Object.values(item.subComments).map((comment, index) => (
                
                    <ul className="comment-group sub-comments" key={comment.postedOn}>
                        <li className={ replyToClose.includes(comment.postedOn) ? "expand-reply-icon" : "hide-reply-icon" } onClick={() => hideComments(comment.postedOn)} >
                            <article className="comments sub-comment" >   
                                <div className="comment-header">
                                    <p className="float-left">{comment.name}</p>
                                    <p className="reply-posted float-left">
                                        <span className="reply-time">{timeConverter(comment.postedOn)[0]}</span>
                                        {timeConverter(comment.postedOn)[1] && (
                                            <span className="full-date">{timeConverter(comment.postedOn)[1]}</span>
                                        )}
                                    </p>
                                </div>
                                <p>{comment.body}</p>
                                <div className="comment-footer">
                                    <p className="up-votes reply-reaction float-left">{comment.upVotes}</p>
                                    <p className="down-votes reply-reaction float-left">{comment.downVotes}</p>
                                </div>
                            </article>
                        </li>
                        {comment.subComments.length > 0 && (
                            <li className={replyToClose.includes(comment.postedOn) ? "hide-replies" : null }>{loadSubComments(comment)}</li>
                        )}
                    </ul>
            ));
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
                <ul className="comment-group" id={`reply-${comment.postedOn}`} key={comment.postedOn}>
                    <li className={ replyToClose.includes(comment.postedOn) ? "expand-reply-icon" : "hide-reply-icon" } onClick={() => hideComments(comment.postedOn)}>
                        <article className="comments" >
                            <div className="comment-header">
                                <p className="float-left">{comment.name}</p>
                                <p className="float-left">&middot;</p>
                                <p className="reply-posted float-left">
                                    <span className="reply-time">{timeConverter(comment.postedOn)[0]}</span>
                                    {timeConverter(comment.postedOn)[1] && (
                                        <span className="full-date">{timeConverter(comment.postedOn)[1]}</span>
                                    )}
                                </p>
                            </div>
                            <p>{comment.body}</p>
                            <div className="comment-footer">
                                <p className="up-votes reply-reaction float-left">{comment.upVotes}</p>
                                <p className="down-votes reply-reaction float-left">{comment.downVotes}</p>
                            </div>
                        </article>
                    </li>
                    {comment.subComments.length > 0 && (
                    <li className={ replyToClose.includes(comment.postedOn) ? "hide-replies" : null }>{loadSubComments(comment)}</li>
                    )}
                </ul>
                ))}
            </div>
        </section>
    );
}

export default Comments;