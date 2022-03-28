import React from 'react'

import './About.scss';

import lucia  from '../../assets/lucia.jpg';
import jezú  from '../../assets/jezú.jpg';
import sandra  from '../../assets/sandra.jpg';


const About = () => {


    return (
        <>
            <div className='preject'>
            <h1>EL PROYECTO</h1>

            </div>
            <div className='us'>
                <h1>Sobre nosotros...</h1>
                <div className='us__item'>
                    <div className='us__img'>
                        <img src={lucia}/>
                    </div>
                    <div>
                        <h2>Lucía</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum, eros sit amet commodo tempor, ipsum orci dapibus metus, eu aliquet nibh enim a sapien. Aliquam vel nisl at velit faucibus consectetur non a tellus. Aliquam turpis purus, fermentum et posuere vitae, iaculis suscipit orci. Integer dictum purus nisl. Aliquam erat volutpat. Mauris vitae nulla in est sodales luctus. Ut gravida feugiat accumsan. Cras efficitur porttitor nibh, id feugiat leo dapibus sit amet. Donec ex est, tincidunt et blandit eget, ultrices sit amet leo. In nisl lorem, tincidunt sit amet quam eget, sodales accumsan erat. Maecenas orci ligula, dapibus ac porta nec, varius non enim. Duis elit dui, bibendum sit amet scelerisque id, posuere quis velit.
                        </p>
                    </div>
                </div>

                <div className='us__item'>
                    <div>
                        <h2 className='us__item-jesus'>Jesús</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum, eros sit amet commodo tempor, ipsum orci dapibus metus, eu aliquet nibh enim a sapien. Aliquam vel nisl at velit faucibus consectetur non a tellus. Aliquam turpis purus, fermentum et posuere vitae, iaculis suscipit orci. Integer dictum purus nisl. Aliquam erat volutpat. Mauris vitae nulla in est sodales luctus. Ut gravida feugiat accumsan. Cras efficitur porttitor nibh, id feugiat leo dapibus sit amet. Donec ex est, tincidunt et blandit eget, ultrices sit amet leo. In nisl lorem, tincidunt sit amet quam eget, sodales accumsan erat. Maecenas orci ligula, dapibus ac porta nec, varius non enim. Duis elit dui, bibendum sit amet scelerisque id, posuere quis velit.
                        </p>
                    </div>
                    <div className='us__img'>
                        <img src={jezú}/>
                    </div>
                </div>

                <div className='us__item'>
                    <div className='us__img'>
                        <img src={sandra}/>
                    </div>
                    <div>
                        <h2>Sandra</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum, eros sit amet commodo tempor, ipsum orci dapibus metus, eu aliquet nibh enim a sapien. Aliquam vel nisl at velit faucibus consectetur non a tellus. Aliquam turpis purus, fermentum et posuere vitae, iaculis suscipit orci. Integer dictum purus nisl. Aliquam erat volutpat. Mauris vitae nulla in est sodales luctus. Ut gravida feugiat accumsan. Cras efficitur porttitor nibh, id feugiat leo dapibus sit amet. Donec ex est, tincidunt et blandit eget, ultrices sit amet leo. In nisl lorem, tincidunt sit amet quam eget, sodales accumsan erat. Maecenas orci ligula, dapibus ac porta nec, varius non enim. Duis elit dui, bibendum sit amet scelerisque id, posuere quis velit.
                        </p>
                    </div>
</div>

            </div>
        </>
       
    )
}

export default About;