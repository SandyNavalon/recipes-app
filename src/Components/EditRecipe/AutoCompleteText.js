import { useState } from "react";
import ingredients from "../AddRecipes/IngredientsList/ingredients";

const AutoCompleteText = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const onTextChanged = (ev) => {
    const { value } = ev.target;

    if (value.length) {
      const regex = new RegExp(`^${value}`, "i");
      const filter = ingredients.sort().filter((v) => regex.test(v));
      setSuggestions(filter);
    } else {
      setSuggestions([]);
    }

    setInputValue(value);
  };

  const suggestionSelected = (value) => {
    if (selectedIngredients.find(ingredient => ingredient === value)) return;

    const newIngredients = [...selectedIngredients, value];
    setSelectedIngredients([...selectedIngredients, value]);
    setSuggestions([]);
    setInputValue("");
    props.changeIngredients(newIngredients);
  };

  const deleteSeletedIngredients = (ingredients) => {
    const newIngredients = selectedIngredients.filter(i => i !== ingredients);
    setSelectedIngredients(newIngredients);
    props.changeIngredients(newIngredients);
  };

  const renderSelected = () => {
    if (!selectedIngredients.length) return null;

    return (
      <>
        <div>
          <h2>LISTA INGREDIENTES</h2>
          <ul>
            {selectedIngredients.map((item) => (
              <li key={item}>
                <span onClick={() => deleteSeletedIngredients(item)}>x</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const renderSuggestions = () => {
    if (!suggestions.length) return null;

    return (
      <>
        <ul>
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => suggestionSelected(item)}>
              {item}
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div>
      <input value={inputValue} onChange={onTextChanged} type="text" />
      <div>{renderSuggestions()}</div>
      <div>{renderSelected()}</div>
    </div>
  );
};

export default AutoCompleteText;
