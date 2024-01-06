import { BiBell , BiUserCircle , BiMenu} from 'react-icons/bi';
import React from 'react';
import Link from "next/link";

const Navbar = () => {
    return (
        <div id="main-nav" className={`mainNav`}>
            <nav className={`navbar navbar-light navBar`}>
                <div className={`container-fluid containerFluid`}>
                    <button className="navbar-toggler d-xl-none" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">NLE Q&A</a>

                    <ul className={`nav nav-underline d-none d-md-none d-xl-flex navUl`}>
                        <li className={`nav-item navLi`}>
                            <a className={`nav-link active navLink`} aria-current="page" href="#">Home</a>
                        </li>
                        <li className={`nav-item navLi`}>
                            <a className={`nav-link navLink`} href="#">Spaces</a>
                        </li>
                        <li className={`nav-item navLi`}>
                            <a className={`nav-link navLink`} href="#">Answers</a>
                        </li>
                        <li className={`nav-item navLi`}>
                            <a className={`nav-link navLink`} href="/Bookmark">Bookmarks</a>
                        </li>
                        <form className={`d-flex searchBox`}role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </button>
                        </form>
                    </ul>

                    <div className={`profileBox`}>
                        <Link className={`btn position-relative`} href={'/Notification'}>
                            <BiBell size={24} className={`NotificationIcon`}/>
                            <span
                                className="position-absolute top-30 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </Link>
                        <button className={`btn ProfileBtn`}>
                            <BiUserCircle size={26} className={`userIcon`}/>
                            <span className={`userName`}>Biraj</span>
                            <BiMenu className={`menuIcon`} size={24}/>
                        </button>

                        <div>

                        </div>
                    </div>

                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar"
                         aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link navLink`} href="#">Link</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;