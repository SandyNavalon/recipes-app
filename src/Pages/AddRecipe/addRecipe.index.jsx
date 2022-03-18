
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AutoCompleteText from '../../Components/IngredientsList/AutoCompleteText';
import HideableText from '../../Components/IngredientsList/HideableText';
import { useAuthState } from '../../Context/contexts';

import '../../Styles/form.scss'

const INITIAL_STATE = {
    title: '',
    type: '',
    category: '',
    ingredients:[],
    img: '',
    description:''
};

const AddRecipe = ({ recipes }) => {
    const {user} = useAuthState();

    const [state, setState] = useState(INITIAL_STATE);


    const submitForm = (ev) => {
        ev.preventDefault();
        const { title, type, category, ingredients, img, description } = state;

        if(!title || !type || !category || !ingredients || !description) {
            console.log('Faltan datos');
            return;
        }

        console.log(state);
        setState(INITIAL_STATE)

    };

    const handleInput = (ev) => {
        const {name, value} = ev.target;
        setState({...state, [name]: value})
    };


    return (
        <>
            {user ?
            <div>
                <form autoComplete='off' onSubmit={submitForm}>

                    <fieldset className='form-style'>
                        <label>Título</label>
                        <input type='text' name='title' value={state.title} onChange={handleInput}></input>

                        <label>Categoría</label>
                        <select name='category' value={state.category} onChange={handleInput}>
                            <option value='' disabled selected>Selecciona una opción</option>
                            <option value='desayuno'>Desayuno</option>
                            <option value='almuerzo'>Almuerzo</option>
                            <option value='merienda'>Merienda</option>
                            <option value='cena'>Cena</option>
                            <option value='otros'>Otros</option>
                        </select>

                        <label>Tipo</label>
                        <select name='type' value={state.type} onChange={handleInput}>
                            <option value='' disabled selected>Selecciona una opción</option>
                            <option value='italiana'>Italiana</option>
                            <option value='mediterranea'>Mediterránea</option>
                            <option value='oriental'>Oriental</option>
                        </select>

                        <label>Ingredientes</label>
                        <AutoCompleteText
                        />


                        <label>Receta</label>
                        <textarea name='description' value={state.description} onChange={handleInput}></textarea>

                        <input type='file' name='recipe-img' value={state.img} onChange={handleInput}></input>

                        <button type='submit'> Guardar receta</button>

                    </fieldset>

                </form>
            </div>
            :
            <Navigate to='/'/>
            }
        </>
    )
}

export default AddRecipe;