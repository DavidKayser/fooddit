import { useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../../fooddit.png';
import { SearchBar } from './SearchBar';

export default function Header() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/");
        navigate(0);
    }

    return (
        <nav>
        {<img src={logo} className="logo" alt="fooddit logo" onClick={() => handleClick()} />}
        <SearchBar/>
        </nav>
    );
}
