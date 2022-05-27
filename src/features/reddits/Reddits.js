import React from 'react';
import { Link, useParams, useSearchParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectReddits, selectIsLoading, selectLoadMore, selectNoRedditsFound, selectIsLoadingFilter, loadReddits, changeLoadingStatus } from "./redditsSlice";
import { useEffect, useState, useRef } from "react";
import { Loading } from "../../components/loading/Loading";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { timeConverter } from "../../utils/timeConverter";
import { NotFound } from "../../components/notFound/NotFound";
import logo from '../../fooddit.png';
import "./Reddits.css";

const Reddits = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoading = useSelector(selectIsLoading);
    const isLoadingFilter = useSelector(selectIsLoadingFilter);
    const loadMore = useSelector(selectLoadMore);
    const noRedditsFound = useSelector(selectNoRedditsFound);

    let reddits = useSelector(selectReddits);
    let base;
    let { search } = useParams();
    let [searchParams] = useSearchParams();
    let filter = searchParams.get("filter");
    const [nextToLoad, setNextToLoad] = useState("");
    const [nextSearchToLoad, setNextSearchToLoad] = useState("");
    const [filteredReddits, setFilteredReddits] = useState(reddits);
    const [noMoreReddits, setNoMoreReddits] = useState(false);

    let tallestRefs = useRef([]);
    
    //load search based reddits
    useEffect(() => {
        if (search) {
            if (nextSearchToLoad === "") {
                dispatch(loadReddits({link: `/r/food/search.json?q=${search}&restrict_sr=1&sr_nsfw=`, queryType: "search"}));
            } else {
                dispatch(loadReddits({link: `/r/food/search.json?after=${nextSearchToLoad}&q=${search}&restrict_sr=1&sr_nsfw=`, queryType: "search"}));
            }
        }
    }, [search, dispatch, nextSearchToLoad]);

    //load reddits
    useEffect(() => {
        if (nextToLoad === "none") {
            setNoMoreReddits(true);
            return;
        }
        if (!search) {
            dispatch(loadReddits({link: `/r/food.json?after=${nextToLoad}`, queryType: "full"}));
        }   
    }, [search, dispatch, nextToLoad]);

    //remove filter
    useEffect(() => {
        if (filter === null) {
            setFilteredReddits(reddits);
            dispatch(changeLoadingStatus(false));
        }
    }, [filter, reddits, dispatch]);

    //filter reddits
    useEffect(() => {
            if (filter !== null) {
                //use for loop instead of filter for faster processing
                let arrayData = [];
                for (let i = 0; i < reddits.length; i++) {
                    if (reddits[i].flair === filter) {
                        arrayData.push(reddits[i]);
                    }
                }
                setFilteredReddits(arrayData);
                dispatch(changeLoadingStatus(false));
            }
        }, [reddits, filter, dispatch]);

    //add scroll watch to load more
    useEffect(() => {
        document.addEventListener("scroll", loadOnScroll);
        return () => {
            document.removeEventListener("scroll", loadOnScroll);
        };
    });

    function loadMoreReddits() {
        if (reddits !== undefined && reddits.length > 0 && !isLoading) {
            if (search) {
                setNextSearchToLoad(loadMore);
            } else {
                setNextToLoad(loadMore);
            }
        }
    }

    function loadOnScroll() {
        let scrollHeight, totalHeight;
        scrollHeight = document.body.scrollHeight;
        totalHeight = window.scrollY + window.innerHeight;
        let maxHeight = 0;
        //calculate maxHeight
        for (let i = 0; i < reddits.length; i++) {
            if (tallestRefs.current[i]) {
                const { clientHeight } = tallestRefs.current[i];
                if (clientHeight > maxHeight) {
                        maxHeight = clientHeight;
                }
            } else {
                maxHeight = 900;
            }
        }
        if (totalHeight <= scrollHeight - maxHeight * 2) {
            base = false
        }
        if (totalHeight > scrollHeight - maxHeight * 2) {
            if (base === true) return;
            loadMoreReddits();
            base = true
        } 
    }

    function articleRoute(singleLink, id) {
        const seperateLink = singleLink.split("/");
        const title = seperateLink[seperateLink.length -2];
        return `/article/${id}/${title}`;
    }

    function placeHolderDimensions(width, height) {
        const ratio = height / width * 100;
        if (ratio === 0) {
            return {
                paddingTop: 0
            }
        } else{
            return {
                paddingTop: ratio + "%"
            }
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <section className="main-content">
            <div id="reddits-previews">
            {(noRedditsFound || filteredReddits <= 0)  && !isLoading && (
                <NotFound />
            )}
            {reddits && !noRedditsFound && (
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                    <Masonry>
                        {filteredReddits.map((reddit, index) => (
                                <article style={isLoadingFilter ? {display : "none"} : {display : "block"}} className="reddits-article" key={index} ref={(element) => {tallestRefs.current[index] = element}}>
                                    <div className="reddit-header">
                                        <p className="float-left community">{reddit.subreddit}</p>
                                        <p className="float-left">Posted by {reddit.author}</p>
                                    </div>
                                    <Link data-testid="single-link" to={articleRoute(reddit.singleLink, reddit.id)} state={{ backgroundLocation: location }}> 
                                        <div className="reddits-body">  
                                            <h3 className="reddits-title">{reddit.title}</h3>
                                            <div className="image-wrapper" style={placeHolderDimensions(reddit.mediaDimensions.width, reddit.mediaDimensions.height)}>
                                                <img className="reddits-image" src={reddit.media} key={reddit.title} alt="media" />
                                            </div>
                                        </div>
                                    </Link>
                                    {reddit.mediaType === "link" && (
                                        <a href={reddit.media} target="_blank" rel="noreferrer">LINK</a>
                                    )}
                                    <div className="reddit-footer">
                                        <p className="float-left">{reddit.upvotes} upvotes</p>
                                        <p className="reddits-comments-icon float-left">{reddit.numberOfComments} Comments</p>
                                        <p className="float-left">
                                            <span className="reply-time">{timeConverter(reddit.postedOn)[0]}</span>
                                            {timeConverter(reddit.postedOn)[1] && (
                                                <span className="full-date">{timeConverter(reddit.postedOn)[1]}</span>
                                            )}
                                        </p>
                                    </div>
                                </article>
                        ))}
                    {(isLoading || isLoadingFilter) && <Loading />}
                    {(isLoading || isLoadingFilter) && <Loading />}
                    {(isLoading || isLoadingFilter) && <Loading />}
                    </Masonry>
            </ResponsiveMasonry>
            )}
            </div>
            {noMoreReddits && (
                <div onClick={() => scrollToTop()} id="no-more-posts">
                    <h3>You have reached the end...</h3>
                    <p>^^ click here to return to the top of the page ^^</p>
                    <img src={logo} className="logo-footer" alt="fooddit logo" />

                </div>
            )}
        </section>
    );
}

export default Reddits;
