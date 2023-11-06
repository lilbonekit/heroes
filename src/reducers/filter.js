const initialState = {
    currentFilter: 'all',
    filters: []
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_LOADING':
            return {
                ...state,
                filters: [...state.filters, action.payload.filters]
            }
        case 'SET_FILTER':
            return {
                ...state,
                currentFilter: action.payload.filter
            }
        default: return state
    }
}

export default filters;