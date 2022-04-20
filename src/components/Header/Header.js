import './Header.css';
import logo from '../../fooddit.png';
import { SearchBar } from './SearchBar';
import { useState } from "react";

export default function Header() {
    const [titleToggle, setTitleToggle] = useState(true);

    function handleClick() {
        setTitleToggle(!titleToggle);
    }

    return (
        <nav>
            {<img src={logo} className="logo" alt="my reddit logo" />}
            {/* <h2 id="page-heading"><span onClick={() => handleClick()} className={`heading-border${titleToggle ? " title-on" : ""}`}>Fooddit</span></h2> */}
            <SearchBar/>
        </nav>
    );
}