import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadReddits } from "../../features/reddits/redditsSlice";
import "../../features/reddits/Reddits.css";
import { useState, useEffect } from "react";
import "./Sidebar.css"

const Sidebar = () => {
    const dispatch = useDispatch();
    const foodTypes = ["thai food", "japanese", "chinese", "indian", "african", "american"];
    const [filter, setFilter] = useState();

    useEffect(() => {
        dispatch(loadReddits(`food/search.json?q=${filter}&restrict_sr=1&sr_nsfw=`));
    }, [filter])

    function handleClick(term) {
        const termCleaned = term.replace(/\s/g, "%20");
        setFilter("");
        setFilter(termCleaned);
    }
    
    return (
        <section className="sidebar">
            <h2>Subreddits</h2>
            <ul className="subreddit-list">
                {Object.values(foodTypes).map((foodType, index) => (
                    <li key={index} onClick={() => handleClick(foodType)}>{foodType}</li>
                ))}
            </ul>
        </section>
    );
}

export default Sidebar;