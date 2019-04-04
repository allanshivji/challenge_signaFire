import React from 'react';
import logo from '../logo/logo-sf-small.png';

const NavBarComponent = () => {

    return (
        <nav className="navbar navbar-light bg-light fixed-top">
            <span className="navbar-brand">
                <img src={logo} width="112" height="30" className="d-inline-block align-top" alt="" />
            </span>
            <span className="navbar-text">
                MESSAGE VIEWER
            </span>
        </nav>
    );
};

export default NavBarComponent;