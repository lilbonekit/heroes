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