export const setDealType = (data) => {
    return {
        type: 'SET_DEAL',
        payload: data
    }
}

export const setMan = (data) => {
    return {
        type: 'SET_MAN',
        payload: data
    }
}

export const setCat = (data) => {
    return {
        type: 'SET_CAT',
        payload: data
    }
}

export const setPriceRange = (min, max) => {
    return {
        type: 'SET_RANGE',
        payload: {
            min, max
        }
    }
}