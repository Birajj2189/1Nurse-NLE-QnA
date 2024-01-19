import { BiBell , BiUserCircle , BiMenu} from 'react-icons/bi';
import React from 'react';
import Link from "next/link";

const Navbar = () => {
    return (
        <div id="main-nav" className={`mainNav`}>
            <nav className={`navbar navbar-light navBar`}>
                <div className={`text-center w-100`}>Original Navbar</div>
            </nav>
        </div>
    );
};

export default Navbar;