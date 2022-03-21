import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectReddits } from "./redditsSlice";
import './Reddits.css';

export default function Reddits() {
  const reddits = useSelector(selectReddits);
  return (
    <section className="main-content">
        <h2>Popular Posts</h2>
        <div className="reddits-previews">
            {Object.values(reddits).map((reddit) => (
                <article className="reddit-article" key={reddit.id}>
                    <div className="reddit-header">
                        <img src={reddit.authorImage} alt={reddit.author} className="author-image float-left" />
                        <p className="float-left community">{reddit.community}</p>
                        <p className="float-left">Posted by {reddit.author}</p>
                    </div>
                    <h3>{reddit.title}</h3>
                    <img className="reddit-image" src={reddit.image} alt={reddit.title} />
                    <div className="reddit-footer">
                        <p className="float-left">{reddit.upvotes} upvotes</p>
                        <p className="float-left">{reddit.numberOfComments} Comments</p>
                        <p className="float-left">{reddit.postedOn}</p>
                    </div>
                </article>
            ))}
        </div>
    </section>
  );
}