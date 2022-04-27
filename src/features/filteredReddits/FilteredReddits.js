import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectReddits, selectIsLoading, selectRedditFilter, selectNoRedditsFound } from "../reddits/redditsSlice";
import { useEffect, useState, useRef } from "react";
import { Loading } from "../../components/loading/Loading";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { timeConverter } from "../../utils/timeConverter";
import { NotFound } from "../../components/notFound/NotFound";

const FilteredReddits = () => {
    const location = useLocation();
    const isLoading = useSelector(selectIsLoading);
    const redditFilter = useSelector(selectRedditFilter);
    const noRedditsFound = useSelector(selectNoRedditsFound);

    let reddits = useSelector(selectReddits);
    //let search = searchParams.get("search");
    const [filteredReddits, setFilteredReddits] = useState(reddits);

    let tallestRefs = useRef([]);

    //filter reddits
    useEffect(() => {
        setFilteredReddits(reddits.filter(reddit => reddit.flair === redditFilter));
    }, [redditFilter, reddits]);


    //set path for link
    function articleRoute(singleLink, id) {
        const seperateLink = singleLink.split("/");
        const title = seperateLink[seperateLink.length -2];
        return `/article/${id}/${title}`;
    }

    //get dimensions for placeholder image
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

    return (
        <section className="main-content">
            <div id="reddits-previews">
            {(noRedditsFound || filteredReddits <= 0) && (
                <NotFound />
            )}
            {reddits && !noRedditsFound && (
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry>
                        {filteredReddits.map((reddit, index) => (
                            <article className="reddits-article" key={index} ref={(element) => {tallestRefs.current[index] = element}}>
                                <div className="reddit-header">
                                    <p className="float-left community">{reddit.subreddit}</p>
                                    <p className="float-left">Posted by {reddit.author}</p>
                                </div>
                                <Link data-testid="single-link" to={articleRoute(reddit.singleLink, reddit.id)} state={{ backgroundLocation: location }}> 
                                    <div className="reddits-body">  
                                        <h3 className="reddits-title">{reddit.title}</h3>
                                        <div className="image-wrapper" style={placeHolderDimensions(reddit.mediaDimensions.width, reddit.mediaDimensions.height)}>
                                            <img className="reddits-image" src={reddit.media} alt="media" />
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
                    {isLoading && <Loading />}
                    {isLoading && <Loading />}
                    {isLoading && <Loading />}
                    </Masonry>
            </ResponsiveMasonry>
            )}
            </div>
        </section>
    );
}

export default FilteredReddits;