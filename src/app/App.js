import './App.css';
import { 
  Routes,
  Route,
  useLocation
 } from 'react-router-dom';
import Header from '../components/header/Header';
import HomePage from '../pages/home/HomePage';
import RedditSingle from '../features/reddits/RedditSingle';


function App() {
  const location = useLocation();
  const state = location.state;
  return (
    <div>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
          <Route index element={<HomePage />} />
      </Routes>
      <Routes location={state?.backgroundLocation || location}>
          <Route path="/cuisine/:category" element={<HomePage />} />
      </Routes>
      <Routes location={state?.backgroundLocation || location}>
          <Route path="/search/:search" element={<HomePage />} />
      </Routes>

      <Routes>
        <Route path="article/:id/:title" element={<RedditSingle />} />
      </Routes>



      </div>
  );
}

export default App;
