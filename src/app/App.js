import './App.css';
import { 
  Routes,
  Route,
  useLocation
 } from 'react-router-dom';
import Header from '../components/Header/Header';
import HomePage from '../pages/home/HomePage';
import Single from '../components/single/Single';


function App() {
  const location = useLocation();
  const state = location.state;
  return (
    <div>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
          <Route index element={<HomePage />} />
      </Routes>
      
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/:id/:title" element={<Single />} />
        </Routes>
      )}
      </div>
  );
}

export default App;
