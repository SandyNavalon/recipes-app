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
    }

    suggestionSelected (value) {
        this.setState(() => ({
            ingredients:[...this.state.ingredients, value],
            text:'',
            suggestions:[],
        }))
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if(suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        )
    }

    render () {
        const {text} = this.state;

        return (
            <div>
                <input value={text} onChange={this.onTextChanged} type='text' />
                    {this.renderSuggestions()}
            </div>
        )
    }

}