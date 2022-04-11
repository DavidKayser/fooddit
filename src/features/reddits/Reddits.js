import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectReddits, selectIsLoading, loadReddits } from "./redditsSlice";
import "./Reddits.css";
import { useEffect } from "react";
import { Loading } from "../../components/loading/Loading";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";


const Reddits = () => {
    const dispatch = useDispatch();
    const reddits = useSelector(selectReddits);
    const isLoading = useSelector(selectIsLoading);
    const location = useLocation();
    let { category } = useParams();
    let base;

    useEffect(() => {
        if(category) {
            dispatch(loadReddits(`r/food/search.json?q=${category}&restrict_sr=1&sr_nsfw=`));
        } else {
            dispatch(loadReddits("r/food.json"));
        }
    }, [dispatch]);

    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", loadMoreReddits);
          }
          watchScroll();
          return () => {
            window.removeEventListener("scroll", loadMoreReddits);
          };
    });

    function loadMoreReddits() {
        let scrollHeight, totalHeight;
        scrollHeight = document.body.scrollHeight;
        totalHeight = window.scrollY + window.innerHeight;

        if (totalHeight <= scrollHeight - 401) {
            base = false
        }
        if (totalHeight >= scrollHeight - 400) {
            if (base === true) return;
            if (reddits) {
                let loadMoreIndex = reddits.length - 1;
                dispatch(loadReddits(`r/food.json?after=${reddits[loadMoreIndex].loadNext}`));
            }
            base = true
        }
    }

    function articleRoute(title, id) {
        const cleanTitle = title.replace(/[^a-zA-Z0-9-_]/g, '');
        return `/${id}/${cleanTitle}`
    }

    return (
        <section className="main-content">
            <div className="reddits-previews">
                {isLoading && (
                    <Loading />
                )}
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} >
                    <Masonry>
                        {Object.values(reddits).map((reddit, index) => (
                            <article className="reddits-article" key={index}>
                                <div className="reddit-header">
                                    <p className="float-left community">{reddit.subreddit}</p>
                                    <p className="float-left">Posted by {reddit.author}</p>
                                </div>
                                <Link data-testid="single-link" to={articleRoute(reddit.title, reddit.id)} state={{ backgroundLocation: location }}> 
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

                    
                    </Masonry>
                </ResponsiveMasonry>

            </div>
        </section>
    );
}

export default Reddits;