import React from 'react'
import { useLocation } from 'react-router-dom';
import NavbarOne from '../../Components/NavbarOne/NavbarOne';
import RecipeList from '../../Components/RecipeList/RecipeList'
import Login from '../Login/login.index';
import './home.scss';

const Home = () => {

  const location = useLocation();

  return (
   <>
    <div><NavbarOne/></div> 
    
    <div className='container'>
    <div className='login-module'>
      <Login/>
    </div>
    <h1>ÚLTIMAS RECETAS</h1>
    <div className='dashboardPublic'>
        <RecipeList key={location.key} />
     </div></div></>
 )
}

export default Home;