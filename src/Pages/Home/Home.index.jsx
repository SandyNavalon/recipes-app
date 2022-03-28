import React from 'react'
import { useLocation } from 'react-router-dom';
import NavbarOne from '../../Components/NavbarOne/NavbarOne';
import RecipeList from '../../Components/RecipeList/RecipeList'
import { useAuthState } from '../../Context/contexts';
import Login from '../../Components/Login/login.component';
import './home.scss';

const Home = () => {

  const location = useLocation();
  const user = useAuthState();
  console.log('user on home:', user.id);

  return (
   <>
    <div><NavbarOne/></div> 
    
    <div className='container'>

      {!user.id ? (
       <div className='login-module'>
      <Login/>
      </div>
       ) : (<div><p></p></div>)
       }

    <h1>ÚLTIMAS RECETAS</h1>
    <div className='dashboardPublic'>
        <RecipeList key={location.key} />
     </div></div></>
 )
}

export default Home;