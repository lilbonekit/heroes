const initialState = {
    heroes: [],
    // Будем всегда показывать отфильтрованных персонажей
    // Добавим для этого текущий фильтр и по нему будем делать фильтрацию
    currentFilter: 'all',
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETING':
            return {
                ...state,
                heroes: state.heroes.filter(el => el.id !== action.payload.id)
            }
        case 'HERO_ADDING':
            return {
                ...state,
                heroes: [...state.heroes, action.payload.newHero]
            }
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

export default reducer;