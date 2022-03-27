// Pages/NotFound/index.js

import React from 'react';
import NavbarTwo from '../../Components/NavbarTwo/NavbarTwo';
import './notFound.scss';

function NotFound(props) {
    return (
        <>
            <NavbarTwo/>
            <div className='notFound'>
                <h1 className='notFound__title'>404 Page not found</h1>
            </div>
        </>
    );
}

export default NotFound;