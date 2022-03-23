import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectReddits, loadReddits } from "./redditsSlice";
import './Reddits.css';
import { useEffect } from "react";

const Reddits = () => {
    const dispatch = useDispatch();
    const reddits = useSelector(selectReddits);

    useEffect(() => {
        dispatch(loadReddits());
    }, [dispatch]);

    return (
        <section className="main-content">
            <h2>Popular Posts</h2>
            <div className="reddits-previews">
                {Object.values(reddits).map((reddit, index) => (
                    <article className="reddit-article" key={index}>
                        <div className="reddit-header">
                            <p className="float-left community">{reddit.subreddit}</p>
                            <p className="float-left">Posted by {reddit.author}</p>
                        </div>
                        <h3>{reddit.title}</h3>
                        {reddit.mediaType === "image" && (
                            <img className="reddit-image" src={reddit.media} alt="media" />
                        )}
                        {reddit.mediaType === "link" && (
                            <a href={reddit.media} target="_blank">LINK</a>
                        )}
                        <div className="reddit-footer">
                            <p className="float-left">{reddit.upvotes} upvotes</p>
                            <p className="float-left">{reddit.numberOfComments} Comments</p>
                            <p className="float-left">{reddit.postedOn}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Reddits;