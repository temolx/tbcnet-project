const DealReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_DEAL':
            return action.payload.length == 2 ? '' : action.payload[0];
        default:
            return state;
    }
}

export default DealReducer