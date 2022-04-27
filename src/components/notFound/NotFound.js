import './NotFound.css';
import brokenReddit from '../../media/broken-reddit.png';

export const NotFound = () => {
    return (
        <div id="none-found">
            <h2>NO REDDITS FOUND</h2>
            <p>Try another search or clear the filter.</p>
            <img src={brokenReddit} alt="broken reddit" />
        </div>
    );
}