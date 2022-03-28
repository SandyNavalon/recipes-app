// Pages/NotFound/index.js

import React from 'react';
import NavbarTwo from '../../Components/NavbarTwo/NavbarTwo';
import './notFound.scss';
import empty from "../../assets/empty.png";

function NotFound(props) {
    return (
        <>
            <NavbarTwo/>
            <div className='notFound'>
                <div>
                    <h1 className='notFound__title'>404</h1>
                    <h2>Nada en la nevera</h2>
                </div>
                
                <img src={empty} alt="empty fridge"></img>
            </div>
            
        </>
    );
}

export default NotFound;