import "../../features/reddits/Reddits.css";
import { filterReddits } from "../../features/reddits/redditsSlice";

import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./Categories.css"

const Categories = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filters = ["Announcement", "Recipe In Comments", "Vegetarian", "Lactose-Free", "Vegan", "Gluten-Free"];
    
    let { filter } = useParams();
    const categoryIndex = filters.indexOf(filter);
    const [activeItem, setActiveItem] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(() => {
        if (filter) {
            setActiveItem(categoryIndex);
        }
    }, [activeItem, categoryIndex, filter])

    function handleClick(filter, i) {
        if (activeItem === i) {
            setActiveItem();
            dispatch(filterReddits(null));
            setSearchParams("");
            console.log("remove filter")
        } else {
            setActiveItem(i);
            dispatch(filterReddits(filter));
            setSearchParams(filter);
            console.log("set filter")
        }
    }
    
    return (
        <section id="flairs">
            <h3 id="filter-title">Filter By Flair</h3>
            <ul className="subreddit-list">
                {filters.map((filter, index) => (
                    <li
                        key={index}
                        className={`filter${activeItem === index ? " active" : "" }${activeItem !== undefined && activeItem !== index ? " inactive" : ""}`}
                        onClick={() => handleClick(filter, index)}
                    >
                        {filter}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Categories;