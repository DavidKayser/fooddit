import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectReddits, selectIsLoading, loadReddits } from "./redditsSlice";
import "./Reddits.css";
import { useEffect } from "react";
import { Loading } from "../../components/loading/Loading";

const Reddits = () => {
    const dispatch = useDispatch();
    const reddits = useSelector(selectReddits);
    const isLoading = useSelector(selectIsLoading);
    const location = useLocation();
    let { category } = useParams();

    useEffect(() => {
        if(category) {
            dispatch(loadReddits(`r/food/search.json?q=${category}&restrict_sr=1&sr_nsfw=`));
        } else {
            dispatch(loadReddits("r/food.json"));
        }
    }, [dispatch]);

    function articleRoute(title, id) {
        const cleanTitle = title.replace(/[^a-zA-Z0-9-_]/g, '');
        return `/${id}/${cleanTitle}`
    }

    return (
        <section className="main-content">
            
            <div className="reddits-previews">
                {isLoading && (
                    <div>
                    <Loading />
                    <article className="reddit-loading-article">
                        <div className="reddit-loading-header">loading</div>
                        <div className="reddit-loading-image"></div>
                        <div className="reddit-loading-footer"></div>
                    </article>
                    </div>
                )}
                {Object.values(reddits).map((reddit, index) => (
                    <article className="reddit-article" key={index}>
                        <div className="reddit-header">
                            <p className="float-left community">{reddit.subreddit}</p>
                            <p className="float-left">Posted by {reddit.author}</p>
                        </div>
                        <Link data-testid="single-link" to={articleRoute(reddit.title, reddit.id)}
                            state={{ backgroundLocation: location }}>   
                        <h3>{reddit.title}</h3>
                        {reddit.mediaType === "image" && (
                            <img className="reddit-image" src={reddit.media} alt="media" />
                        )}
                        </Link>
                        {reddit.mediaType === "link" && (
                            <a href={reddit.media} target="_blank" rel="noreferrer">LINK</a>
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