import "../../features/reddits/Reddits.css";
import { changeLoadingStatus, selectReddits } from "../../features/reddits/redditsSlice";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Categories.css"

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = ["Recipe In Comments", "Vegetarian", "Lactose-Free", "Vegan", "Gluten-Free"];
    const [activeItem, setActiveItem] = useState("none");
    const [filterHover, setFilterHover] = useState(false);
    const [expandFilters, setExpandFilters] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter");
    const categoryIndex = filters.indexOf(filter);
    let { search } = useParams();
    let reddits = useSelector(selectReddits);

    //set filter if direct link
    useEffect(() => {
        if (searchParams.get("filter") !== null) {
            setActiveItem(categoryIndex);
            console.log("set filter");
        }
    }, [dispatch, searchParams, categoryIndex, filter]);

    //add scroll watch to fix filters in place
    useEffect(() => {
        document.addEventListener("scroll", filterPositionFixed);
        
        return () => {
            document.removeEventListener("scroll", filterPositionFixed);
        };
    });

    const filterPositionFixed = () => {
        if (window.scrollY > 100) {
            setFilterHover(true);
        } else {
            setFilterHover(false);
        }
    }

    //set and unset filter
    function handleFiltering(filter, i) {
        if (activeItem === i) {
            console.log(reddits.length)
            if (reddits.length > 400) {
                resetApp();
            }
            setActiveItem("none");
            dispatch(changeLoadingStatus(true));
            setSearchParams();
            console.log("remove filter");
        } else {
            setActiveItem(i);
            dispatch(changeLoadingStatus(true));
            setSearchParams({filter: filter});
            console.log("set filter");
        }
    }

    //clear search and reset app
    function resetApp() {
        navigate("/");
        navigate(0);
    }

    const handleFilterImageClick = () => {
        setExpandFilters(!expandFilters);
    }
    
    return (
        <section id="filtering" className={`${filterHover ? "filter-fixed" : ""} ${expandFilters ? "expand-filters" : ""}`}>
            
            <ul className="subreddit-list">
                <li id="filter-image" onClick={handleFilterImageClick}></li>
                <li id="filter-title">Filters:</li>
                {filters.map((filter, index) => (
                    <li
                        key={filter}
                        className={`filter${activeItem === index ? " active" : "" }${activeItem !== "none" && activeItem !== index ? " inactive" : ""}`}
                        onClick={() => handleFiltering(filter, index)}
                    >
                        {filter}
                    </li>
                ))}
            </ul>
            {search && (
                <ul id="searchList" className="subreddit-list">
                    <li id="search-title">Search:</li>
                    <li id="search-term" className="filter active" onClick={() => resetApp()}>{search}</li>
                </ul>
            )}
        </section>
    );
}

export default Categories;