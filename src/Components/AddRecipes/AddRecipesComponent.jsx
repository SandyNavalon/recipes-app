import { Tag } from '@mui/icons-material';
import { Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from '../../Context/contexts';

import '../../Pages/AddRecipe/addRecipe.scss'
import AutoCompleteText from './IngredientsList/AutoCompleteText';
import CustomizedHook from './IngredientsList/IngredientsSelectionTextComponent';
import ingredientsList from '../AddRecipes/IngredientsList/ingredients'

const AddRecipe = ({handleSubmit}) => {
    // const {user, _id} = useAuthState();
    let navigate = useNavigate();

    const { user } = useAuthState();

    // const {ingredients} = AutoCompleteText;

    // traer el ID de user desde localStorage
    const currentUser = localStorage.getItem('currentUser');
    const userParsed = JSON.parse(currentUser);

    // console.log('current', userParsed._id);


    //COMPONENTE INGREDIENTES//

    //? ingredientslist
    const [state, setState] = useState({
        text:'',
        suggestions:[],
        ingredientsText:[]
    });

    const onTextChanged = (ev) => {
        const value = ev.target.value;
        let suggestions = [];

        if(value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = state.ingredientsText.sort().filter(v => regex.test(v));
            }
            setState(() => ({ suggestions, text: value }));
        }

    function suggestionSelected(value) {
        setState(() => ({
            ingredientsText:[...state.ingredientsText.value],
            text:'',
            suggestions:[],
        }))
    }

    function ingredientSelected(value) {
        setState(() => ({
            ingredientsText:[...state.ingredientsText, value]
        }))
    }

    function renderSelection() {
        const { ingredientsText } = state;
        if(ingredientsText.length === 0) {
            return null;
        }

        return (
            <>
                <div>
                    <h2>LISTA INGREDIENTES</h2>
                        <ul>
                        {ingredientsText.map((item, index) => <li value={state.ingredientsText} key={index}>{item}</li>)}
                        </ul>
                    </div>
            </>
        )
    }

    function renderSuggestions() {
        const {suggestions} = state;
        if(suggestions.length === 0) {
            return null
        }
        return(
            <>
                <ul>
                    {suggestions.map((item, index) => <li key={index} onClick={() => suggestionSelected(item)}>{item}</li>)}
                </ul>
            </>
        )
    }

    //FIN COMPONENTE INGREDIENTES//

    const [formState, setFormState] = useState({
        title: '',
        type: '',
        category: '',
        ingredients:[],
        img: '',
        description:'',
        userId: userParsed._id
    });

    const updateIngredients = (ingredients) =>{
        setFormState({...formState, ingredients})
    }

    //handleChange
    const handleInput = (ev) => {
        const {name, value} = ev.target;
        setFormState({...formState, [name]: value})
    };

    const submitForm = (ev) => {
        ev.preventDefault();//prevenir comportamiento nativo navegador
        handleSubmit({ ...formState, userId: userParsed._id});

        alert('¡RECETA GUARDADA!')
        navigate('/dashboard')//redirige a dashboard cuando posteas la receta
        console.log(formState);

    };

    const{text} = state;

    return (
        <>
            {user ?
            <div>
                <form autoComplete='off' onSubmit={submitForm}>

                    <fieldset className='form-style'>
                        <label>Título</label>
                        <input type='text' name='title' value={formState.title} onChange={handleInput}></input>

                        <label>Categoría</label>
                        <select name='category' value={formState.category} onChange={handleInput}>
                            <option value='' defaultValue={''}>Selecciona una opción</option>
                            <option value='desayuno'>Desayuno</option>
                            <option value='almuerzo'>Almuerzo</option>
                            <option value='merienda'>Merienda</option>
                            <option value='cena'>Cena</option>
                            <option value='otros'>Otros</option>
                        </select>

                        <label>Tipo</label>
                        <select name='type' value={formState.type} onChange={handleInput}>
                            <option value='' defaultValue={''}>Selecciona una opción</option>
                            <option value='italiana'>Italiana</option>
                            <option value='mediterranea'>Mediterránea</option>
                            <option value='oriental'>Oriental</option>
                        </select>

                        Lista ingredientes
                        {/* <div>
                            <input value={text} onChange={onTextChanged} type='text'/>
                            <div>{renderSuggestions()}</div>
                            <div>{renderSelection()}</div>
                        </div> */}
                        {/* <CustomizedHook setIngChosen={setIngChosen} ingChosen={ingChosen} /> */}
                        <AutoCompleteText updateIngredients={updateIngredients}/>
                        {/* <button>añadir</button> */}

                        <label>Preparación</label>
                        <textarea name='description' value={formState.description} onChange={handleInput}></textarea>

                        <input
                            type='file'
                            name='file'
                            placeholder='Subir una foto'
                            onChange={handleInput}
                        />

                        <div style={{ padding: "20px" }}>
                            {formState.img ? (
                                <img src={formState.img} alt={formState.name} width="200px" />
                            ) : null}
                        </div>

                        <button type='submit'>Guardar receta</button>

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