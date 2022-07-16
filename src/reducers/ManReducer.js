const ManReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_MAN':
            return action.payload;
        default:
            return state;
    }
}

export default ManReducer