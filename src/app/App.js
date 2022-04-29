import './App.css';
import { 
  Routes,
  Route,
  useLocation
 } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import RedditSingle from '../features/reddits/RedditSingle';
import Header from '../components/header/Header';

function App() {
  const location = useLocation();
  const state = location.state;
  return (
    <div>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:search" element={<HomePage />} />
          <Route path="article/:id/:title" element={<RedditSingle />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="article/:id/:title" element={<RedditSingle />} />
        </Routes>
      )}



      </div>
  );
}

export default App;
