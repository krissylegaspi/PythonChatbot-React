import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <nav>
        <div className="nav-wrapper pink lighten-2">
            <Link to={'/'} className="brand-logo center">Kristine's Coffee Shop</Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down pink lighten-2">
                <li><Link to={'/menu'}>Menu</Link></li>
                <li><Link to={'/about'}>About</Link></li>
            </ul>
        </div>
    </nav>
)

export default Header;