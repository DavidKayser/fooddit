import { useDispatch } from "react-redux";
import { loadReddits } from "../../features/reddits/redditsSlice";
import "../../features/reddits/Reddits.css";
import { useState, useEffect } from "react";
import "./Sidebar.css"

const Sidebar = () => {
    const dispatch = useDispatch();
    const foodTypes = ["thai", "japanese", "chinese", "indian", "african", "american"];
    const [activeItem, setActiveItem] = useState();


    function handleClick(term, i) {
        if (activeItem === i) {
            console.log(activeItem);
            setActiveItem();
            dispatch(loadReddits("food.json"));
            console.log(activeItem);
        } else {
            setActiveItem(i);
            const termCleaned = term.replace(/\s/g, "%20");
            dispatch(loadReddits(`food/search.json?q=${termCleaned}&restrict_sr=1&sr_nsfw=`));
        }
    }
    
    return (
        <section className="sidebar">
            <ul className="subreddit-list">
            <h3>Filter By Cuisine</h3>
                {Object.values(foodTypes).map((foodType, index) => (
                    <li
                        className={`cuisine${activeItem === index ? " active" : "" }${activeItem !== undefined && activeItem !== index ? " inactive" : ""}`}
                        key={index} 
                        onClick={() => handleClick(foodType, index)}
                    >
                        {foodType}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Sidebar;