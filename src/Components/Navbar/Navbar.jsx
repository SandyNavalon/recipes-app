import React from 'react'
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
    return (

        <div>
        <ul>
        <li className='nav__btn'>
            <NavLink
            className={({isActive}) => (isActive ? 'active' : 'inactive')}
            to="/dashboard">
            DASHBOARD
            </NavLink>
        </li>
            <li className='nav__btn'>
                {/* la className afecta a todos los endpoints porque van con '/' */}
                <NavLink
                className={({isActive}) => (isActive ? 'active' : 'inactive')}
                to="/login">
                    LOGIN
                </NavLink>
            </li>
        </ul>
        </div>
    )
}

export default Navbar;