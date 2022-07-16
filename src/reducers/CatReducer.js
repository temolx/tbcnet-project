const CatReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_CAT':
            return action.payload;
        default:
            return state;
    }
}

export default CatReducer