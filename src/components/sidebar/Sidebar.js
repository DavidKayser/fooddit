import { useDispatch } from "react-redux";
import { loadReddits } from "../../features/reddits/redditsSlice";
import "../../features/reddits/Reddits.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Sidebar.css"

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const foodTypes = ["thai", "japanese", "chinese", "indian", "african", "american"];
    let { category } = useParams();
    const categoryIndex = foodTypes.indexOf(category);
    const [activeItem, setActiveItem] = useState();
    
    useEffect(() => {
        if (category) {
            setActiveItem(categoryIndex);
        }
    }, [activeItem])

    function handleClick(term, i) {
        if (activeItem === i) {
            setActiveItem();
            dispatch(loadReddits("r/food.json"));
            navigate(-1);
        } else {
            setActiveItem(i);
            const termCleaned = term.replace(/\s/g, "%20");
            dispatch(loadReddits(`r/food/search.json?q=${termCleaned}&restrict_sr=1&sr_nsfw=`));
        }
    }
    
    return (
        <section className="sidebar">
            <h3 id="filter-title">Filter By Cuisine</h3>
            <ul className="subreddit-list">
                {Object.values(foodTypes).map((foodType, index) => (
                    <Link key={index}  to={`/${foodType}`}>
                    <li
                        className={`cuisine${activeItem === index ? " active" : "" }${activeItem !== undefined && activeItem !== index ? " inactive" : ""}`}
                        onClick={() => handleClick(foodType, index)}
                    >
                        {foodType}
                    </li>
                    </Link>
                ))}
            </ul>
        </section>
    );
}

export default Sidebar;