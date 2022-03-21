import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Context/actions';
import { useAuthDispatch, useAuthState } from '../../Context/contexts';

import './Navbar.scss';

const Navbar = () => {

    let navigate = useNavigate();
    const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
    const user = useAuthState(); //lee los detalles del usuario del contexto


    const handleLogout = () => {
        //RECARGA LA PAG, pero tarda un segundo - revisar
        window.location.reload();
        logoutUser(dispatch);//llama a la acción logout
        navigate("/"); //navega de nuevo al login sin usuario
    }


    return (

        <div className='navbar'>
            <div className='navbar__item-btn'>
                <NavLink
                className={({isActive}) => (isActive ? 'active' : 'inactive')}
                to="/">
                ver recetas
                </NavLink>
            </div>
            <div className='navbar__item-btn'>
                <NavLink
                className={({isActive}) => (isActive ? 'active' : 'inactive')}
                to="/dashboard">
                mi recetario
                </NavLink>
            </div>

            { user.email ? (
                    <div className='navbar__item'>
                        <p>Bienvenida/o {user.user}</p>

                        <div className='navbar__item-btn'>
                        <NavLink
                        onClick={handleLogout}
                        className={({isActive}) => (isActive ? 'active' : 'inactive')}
                        to="/">
                            LOGOUT
                        </NavLink>
                        </div>
                    </div>)

                    :

                    <div className='navbar__item'>
                        <p>Bienvenida/o</p>

                        <div className='navbar__item-btn'>
                            {/* la className afecta a todos los endpoints porque van con '/' */}
                            <NavLink
                                className={({isActive}) => (isActive ? 'active' : 'inactive')}
                                to="/login">
                                LOGIN
                                </NavLink>
                        </div>

                    </div>}
        </div>
    )
}

export default Navbar;