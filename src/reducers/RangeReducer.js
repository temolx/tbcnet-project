const RangeReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_RANGE':
            return action.payload;
        default:
            return state;
    }
}

export default RangeReducer