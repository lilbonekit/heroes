export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroRemoving = (id) => {
    return {
        type: 'HERO_DELETING',
        payload: {
            id
        }
    }
}

export const heroAdding = (newHero) => {
    return {
        type: 'HERO_ADDING',
        payload: {
            newHero
        }
    }
}

export const filtersLoading = (filters) => {
    return {
        type: 'FILTERS_LOADING',
        payload: {
            filters
        }
    }
}

export const selectFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: {
            filter
        }
    }
}