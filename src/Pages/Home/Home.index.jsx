import React from 'react'
import { useLocation } from 'react-router-dom';
import RecipeList from '../../Components/RecipeList/RecipeList'

const Home = () => {

  const location = useLocation();

  return (
    <div className='dashboardPublic'>
        <RecipeList key={location.key} />
    </div>
  )
}

export default Home;