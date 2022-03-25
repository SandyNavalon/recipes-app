const getItem = (item) => JSON.parse(localStorage.getItem(item));

const setItem = (name, value) => localStorage.setItem(name, JSON.stringify(value));

const addToExistingArray = (name, value) => {
    const list = getItem(name) || [];
    const newList = list.concat(value);
    setItem(name, newList);
    return newList;
};


export {
    getItem,
    setItem,
    addToExistingArray,
};