import { useState } from "react";


const AutoComplete = ({ suggestions }) => {

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    const onChange = (ev) => {
        const userInput = ev.target.value;

        // Filter our suggestions that don't contain the user's input
        const dismissed = suggestions.filter(
        (suggestion) =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setInput(ev.target.value);
        setFilteredSuggestions(dismissed);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };
    //add suggestions
    const onClick = (ev) => {
        setFilteredSuggestions([]);
        setInput(ev.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const onKeyDown = (ev) => {
        // User press the enter key
        if (ev.keyCode === 13) {
            setInput(filteredSuggestions[activeSuggestionIndex]);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
        }
        // User press the up arrow
        else if (ev.keyCode === 38) {
            if (activeSuggestionIndex === 0) {
            return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }

        // User press the down arrow
        else if (ev.keyCode === 40) {
        if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
        }

        setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    }

    const SuggestionsListComponent = () => {

        return filteredSuggestions.length ? (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    let className;

                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                        className = "suggestion-active";
                    }

                    return (
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>
                    );
                })}
            </ul>
        )
        :
        (
            <div className="no-suggestions">
                <h4>No tenemos ese ingrediente</h4>
            </div>
        );
    };


    return (
        <>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            {showSuggestions && input && <SuggestionsListComponent />}
        </>
    );
};

export default AutoComplete;