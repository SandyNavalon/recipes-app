import React from 'react';
import './Footer.scss';
import logo from '../../assets/LOGO-boilbook-blanco.png';
import apple from '../../assets/app.png';
import google from '../../assets/google.png';

const Footer =  () => {
    return <footer className='footer'>
        <section className='footer__logo'>
            <figure className='logo__container'>
                <img className='container__logo-img' alt='logo' src={logo} />
            </figure>
        </section>
        <hr className='footer__line'/>
        <section className='footer__info'>
            <div className='info__creators'>
                <p className='title'>Sitio web desarrollado por:</p>
                <p>Lucia Gutiérrez</p>
                <p>Sandra Navalón</p>
                <p>Jesús Corrales</p>
                <p className='title'>2022-UpgradeHub</p>
            </div>
            <div className='info__apps'>
                <p className='apps__text'>No te descargues la app en:</p>
                <img className='apps__img' alt='apple' src={apple}/>
                <img className='apps__img' alt='google' src={google} />
            </div>
            <div className='info__gratitude'>
                <p className='title'>Especiales agradecimientos a:</p>
                <p>gitlab.com</p>
                <p>cloudinary.com</p>
                <p>mongoDB.com</p>
            </div>
        </section>
    </footer>
}

export default Footer;