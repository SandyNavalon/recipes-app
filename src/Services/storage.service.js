const getItem = (item) => JSON.parse(localStorage.getItem(item));

const setItem = (name, value) => localStorage.setItem(name, JSON.stringify(value));

const addToExistingArray = (name, value) => {
    const list = getItem(name) || [];
    const newList = list.concat(value);
    setItem(name, newList);
    return newList;
};

const addToExistingArrayNested = (property, key, value) => {
    const element = getItem(property) || [];
    const newElement = element[key].concat(value);
    setItem(property, newElement);
    return newElement;
};


export {
    getItem,
    setItem,
    addToExistingArray,
    addToExistingArrayNested
};