import "../../features/reddits/Reddits.css";
import { filterReddits } from "../../features/reddits/redditsSlice";

import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./Categories.css"

const Categories = () => {
    const dispatch = useDispatch();
    const filters = ["Recipe In Comments", "Vegetarian", "Lactose-Free", "Vegan", "Gluten-Free"];
    
    const [activeItem, setActiveItem] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("filter") !== null) {
            const filter = searchParams.get("filter");
            const categoryIndex = filters.indexOf(filter);
            setActiveItem(categoryIndex);
            dispatch(filterReddits(filter));
        }
    });

    function handleClick(filter, i) {
        if (activeItem === i) {
            setActiveItem();
            dispatch(filterReddits(null));
            setSearchParams();
            console.log("remove filter")
        } else {
            setActiveItem(i);
            dispatch(filterReddits(filter));
            setSearchParams({filter: filter});
            console.log("set filter")
        }
    }
    
    return (
        <section id="flairs">
            <ul className="subreddit-list">
                <li id="filter-title">Filters:</li>
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