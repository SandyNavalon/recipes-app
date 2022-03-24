import React, { useState } from 'react';


// const RECIPES2 = [
//     { id: 1, name:'sal', title: 'Plato1', category: 'cena', type: 'americana' },
//     { id: 2, name:'sal', title: 'Platito', category: 'merienda', type: 'tailandesa' },
//     { id: 3, name:'pimienta', title: 'Pasta', category: 'cena', type: 'asiatica' },
//     { id: 4, name:'sal', title: 'Huevos fritos', category: 'almuerzo', type: 'sudamericana' },
//     { id: 5, name:'sal', title: 'Spaghetti', category: 'almuerzo', type: 'china' },
//     { id: 6, name:'sal', title: 'tortilla', category: 'cena', type: 'mediterranea' },
//     { id: 7, name:'sal', title: 'Poutain', category: 'cena', type: 'tailandesa' },
//     { id: 8, name:'pimienta', title: 'Dorada a la sal', category: 'desayuno', type: 'noruega' },
//     { id: 9, name:'sal', title: 'Frite de coles', category: 'desayuno', type: 'desayuno' },
// ];

const RECIPES = [
    { id: 1, name: ['Pepino', 'sal'], title: 'Plato1', category: 'cena', type: 'americana' },
    { id: 2, name: ['Patata', 'sal'], title: 'Platito', category: 'merienda', type: 'tailandesa' },
    { id: 3, name: ['Tomate', 'pimienta'], title: 'Pasta', category: 'cena', type: 'asiatica' },
    { id: 4, name: ['Guacamole', 'sal'], title: 'Huevos fritos', category: 'almuerzo', type: 'sudamericana' },
    { id: 5, name: ['Almendra', 'sal'], title: 'Spaghetti', category: 'almuerzo', type: 'china' },
    { id: 6, name: ['Vino', 'sal'], title: 'tortilla', category: 'cena', type: 'mediterranea' },
    { id: 7, name: ['Eneldo', 'sal'], title: 'Poutain', category: 'cena', type: 'tailandesa' },
    { id: 8, name: ['Pimentón', 'pimienta'], title: 'Dorada a la sal', category: 'desayuno', type: 'noruega' },
    { id: 9, name: ['Carne', 'sal'], title: 'Frite de coles', category: 'desayuno', type: 'desayuno' },
];

function FiltroPrueba() {
    // es el valor del input 
    const [name, setName] = useState('');

    // the search result
    const [foundIngredients, setFoundIngredients] = useState(RECIPES);

    const filter = (e) => {
        //saca el valor del campo y lo guarda en keyword
        const keyword = e.target.value;

        //si keyword tiene algo...
        if (keyword !== '') {
            //Haz un filtrado de recetas ...


            const results = RECIPES.filter((item) => {

                return item.name.filter((ing)=> {
                    return ing.toLowerCase().startsWith(keyword.toLowerCase());
                })

                //return item.name.toLowerCase().startsWith(keyword.toLowerCase());

            //y saca aquellas cuyos ingredientes(en minus) empiecen por la keyword (en minus)
            });
            //y me seteas la variable foundIngredients con lo filtrado
            setFoundIngredients(results);
            console.log('results:', results);
        } else {
            // si keyword no tiene nada, muestralos todos
            setFoundIngredients(RECIPES);

        }
        //y setea name con Keyword
        setName(keyword);
    };

    return (
        <div>
            <input
                type="search"
                value={name}
                onChange={filter}
                placeholder="Filter"
            />

            <div>
                {foundIngredients && foundIngredients.length > 0 ? (
                    foundIngredients.map((ingredients) => (
                        <li key={ingredients.id} >
                            <span>{ingredients.title}</span>
                            <span>{ingredients.type} </span>
                        </li>
                    ))
                ) : (
                    <h1>No results found!</h1>
                )}
            </div>
        </div>
    );
}
export default FiltroPrueba;
