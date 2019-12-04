import React from 'react';
import { NavLink } from 'react-router-dom';
import * as paths from '../../../paths';
import './style.css';

function Menu ()
{
    return (
        <nav className="menu">
            <NavLink
                exact
                to={paths.HOME}
                className="menu__link"
                activeClassName="menu__link--active"
            >all</NavLink>
            <NavLink
                to={paths.FAVOURITES}
                className="menu__link"
                activeClassName="menu__link--active"
            >favourites</NavLink>
        </nav>
    );
}

export default Menu;
