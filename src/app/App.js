import './App.css';
import { 
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import Header from '../components/Header/Header';
import HomePage from '../pages/home/HomePage';
import Categories from '../components/Categories';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/:title' >
            
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
