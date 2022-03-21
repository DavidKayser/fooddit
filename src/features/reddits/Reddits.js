import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectReddits } from "./redditsSlice";

export default function Reddits() {
  const reddits = useSelector(selectReddits);
  return (
    <section className="reddits">
        <h1>Reddits</h1>
        <div className="reddits-previews">
            {Object.values(reddits).map((reddit) => (
                <article key={reddit.id}>
                    <h3>{reddit.title}</h3>
                    <img src={reddit.image} alt={reddit.title} />
                    <div className="redditFooter">
                        <div className="reddit-author">
                            <img src={reddit.authorImage} alt={reddit.author} />
                            <p>{reddit.author}</p>
                        </div>
                        <p>{reddit.postedOn}</p>
                        <p>{reddit.numberOfComments} Comments</p>
                    </div>
                </article>
            ))}
        </div>
    </section>
  );
}