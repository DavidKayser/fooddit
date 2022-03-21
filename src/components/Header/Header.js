import './Header.css';
import logo from '../../logo.png';
import { Search } from './Search';

export default function Header() {
    return (
        <nav>
            {<img src={logo} className="logo" alt="my reddit logo" />}
            <Search />
        </nav>
    );
}