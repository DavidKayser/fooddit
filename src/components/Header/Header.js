import './Header.css';
import logo from '../../fooddit.png';
import { SearchBar } from './SearchBar';

export default function Header() {
    return (
        <nav>
            {<img src={logo} className="logo" alt="my reddit logo" />}
            <SearchBar/>
        </nav>
    );
}