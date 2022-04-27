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

    //set and unset filter
    function handleFilterClick(filter, i) {
        if (activeItem === i) {
            if (reddits.length > 300) {
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
    
    return (
        <section id="filtering">
            <ul className="subreddit-list">
                <li id="filter-title">Filters:</li>
                {filters.map((filter, index) => (
                    <li
                        key={filter}
                        className={`filter${activeItem === index ? " active" : "" }${activeItem !== "none" && activeItem !== index ? " inactive" : ""}`}
                        onClick={() => handleFilterClick(filter, index)}
                    >
                        {filter}
                    </li>
                ))}
            </ul>
            {search && (
                <ul className="subreddit-list">
                    <li id="search-title">Search:</li>
                    <li id="search-term" className="filter active" onClick={() => resetApp()}>{search}</li>
                </ul>
            )}
        </section>
    );
}

export default Categories;