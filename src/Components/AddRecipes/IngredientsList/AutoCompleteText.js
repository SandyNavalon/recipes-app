import React from "react";

import ingredientsList from './ingredients'

export default class AutoCompleteText extends React.Component {
    constructor (props) {
        super(props);
        this.ingredients = ingredientsList;

        this.state = {
            text: '',
            suggestions: [],
            ingredients: [],
        };
    }


    onTextChanged = (ev) => {
        const value = ev.target.value;
        let suggestions = [];

        if(value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.ingredients.sort().filter(v => regex.test(v));
            }
            this.setState(() => ({ suggestions, text: value }));

            // console.log(value)
    }

    suggestionSelected (value) {
        //guardo el value elegido/escrito en input
        // const ingredientChoosen = value;
        // let selectionIngredients = [];

        this.setState(() => ({
            ingredients:[...this.state.ingredients, value],
            text:'',
            suggestions:[],
        }))

        // return(
        //     <>
        //         <div>
        //             <p>{selectionIngredients}</p>
        //         </div>
        //     </>
        // )
    }

    ingredientsSelected (value) {
        this.setState(() => ({
            ingredients:[...this.state.ingredients, value],
            // ingredientsChoosen: []
        }))
    }

    renderSelected () {
        const { ingredients } =this.state;
        if(ingredients.length === 0) {
            return null;
        }
        console.log(ingredients);

        return (
            <>
                <div>
                <h2>LISTA INGREDIENTES</h2>
                    <ul>
                    {ingredients.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                    {/* <button>Confirmar ingredientes</button> */}
                </div>

            </>
        )

    }


    renderSuggestions () {
        const { suggestions } = this.state;
        if(suggestions.length === 0) {
            return null;

        }
        return (
            <>
                <ul>
                    {suggestions.map((item, index) => <li key={index} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
                </ul>

            </>
        )
    }

    render () {
        const {text} = this.state;

        return (
            <div>
                <input value={text} onChange={this.onTextChanged} type='text'/>
                <div>{this.renderSuggestions()}</div>
                <div>{this.renderSelected()}</div>
            </div>
        )
    }
}
