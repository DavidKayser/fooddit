import './App.css';
import { 
  Routes,
  Route,
  useLocation
 } from 'react-router-dom';
import Header from '../components/header/Header';
import HomePage from '../pages/home/HomePage';
import Reddit from '../features/reddits/Reddit';


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
          <Route path="/:category" element={<HomePage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/:id/:title" element={<Reddit />} />
        </Routes>
      )}
      </div>
  );
}

export default App;
