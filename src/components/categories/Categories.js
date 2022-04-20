import { useDispatch, useSelector } from "react-redux";
import { selectReddits, filterReddits } from "../../features/reddits/redditsSlice";
import "../../features/reddits/Reddits.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Categories.css"

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reddits = useSelector(selectReddits);

    const filters = ["Announcement", "Recipe In Comments", "Vegetarian", "Lactose-Free", "Vegan", "Gluten-Free"];
    
    let { filter } = useParams();
    const categoryIndex = filters.indexOf(filter);
    const [activeItem, setActiveItem] = useState();
    
    useEffect(() => {
        if (filter) {
            setActiveItem(categoryIndex);
        }
    }, [activeItem])

    function handleClick(filter, i) {
        if (activeItem === i) {
            setActiveItem();
            dispatch(filterReddits(null));
            navigate(-1);
        } else {
            setActiveItem(i);
            dispatch(filterReddits(filter));
        }
    }
    
    return (
        <section className="sidebar">
            <h3 id="filter-title">Filter By Flair</h3>
            <ul className="subreddit-list">
                {filters.map((filter, index) => (
                    <Link key={index}  to={`/filter/${filter}`}>
                        <li
                            className={`filter${activeItem === index ? " active" : "" }${activeItem !== undefined && activeItem !== index ? " inactive" : ""}`}
                            onClick={() => handleClick(filter, index)}
                        >
                            {filter}
                        </li>
                    </Link>
                ))}
            </ul>
        </section>
    );
}

export default Categories;