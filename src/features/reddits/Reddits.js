import React from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectReddits, selectIsLoading, selectNextToLoad, loadReddits } from "./redditsSlice";
import "./Reddits.css";
import { useEffect, useState, useRef } from "react";
import { Loading } from "../../components/loading/Loading";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


const Reddits = () => {
    const dispatch = useDispatch();
    const reddits = useSelector(selectReddits);
    const isLoading = useSelector(selectIsLoading);
    const nextToLoad = useSelector(selectNextToLoad);
    const location = useLocation();
    const [loadMore, setLoadMore] = useState([""]);
    let { category } = useParams();
    let base;

    let tallestRefs = useRef([]);

    useEffect(() => {
        if(category) {
            dispatch(loadReddits(`r/food/search.json?q=${category}&restrict_sr=1&sr_nsfw=`));

        } else {
            dispatch(loadReddits(`r/food.json?after=${nextToLoad}`));
        }
    }, [loadMore]);

    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", loadOnScroll);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", loadOnScroll);
        };
    });

    //dispatch reddits
    function loadMoreReddits() {
        if (reddits[0] && !isLoading) {
            setLoadMore(loadMore => [...loadMore, nextToLoad]);
        }
    }
    

    // load more reddits when scrolling to bottom
    function loadOnScroll() {
        let maxHeight = 0;
        for (let i = 0; i < reddits.length; i++) {
            const { scrollTop, scrollHeight, clientHeight } = tallestRefs.current[i];
            if (clientHeight > maxHeight) {
                 maxHeight = clientHeight;
            }
        }
        let scrollHeight, totalHeight;
        scrollHeight = document.body.scrollHeight;
        totalHeight = window.scrollY + window.innerHeight;
        if (totalHeight <= scrollHeight - maxHeight * 2) {
            base = false
        }
        if (totalHeight >= scrollHeight - maxHeight * 2) {
            if (base === true) return;
            loadMoreReddits();
            base = true
        } 
    }

    //set path for link
    function articleRoute(title, id, loadNext) {
        const cleanTitle = title.replace(/[^a-zA-Z0-9-_]/g, '');
        const nextIndex = loadMore.indexOf(loadNext);
        if (nextIndex > 1) {
            const getReddit = nextIndex - 1;
            return `/${loadMore[getReddit]}/${id}/${cleanTitle}`;
        }
        return `/${id}/${cleanTitle}`
    }

    return (
        <section className="main-content">
            <div id="reddits-previews">
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry>
                    {reddits.map((reddit, index) => (
                        <article className="reddits-article" key={index} ref={(element) => {tallestRefs.current[index] = element}}>
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
                    {isLoading && <Loading />}
                    {isLoading && <Loading />}
                    {isLoading && <Loading />}
                    </Masonry>
            </ResponsiveMasonry>
            </div>
        </section>
    );
}

export default Reddits;