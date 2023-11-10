import {heroesFetching, heroesFetchingError, heroesFetched} from '../components/heroesList/heroesSlice'
import {filtersLoading, selectFilter} from '../components/heroesFilters/filtersSlice'

export const fetchHeroes = (request) => (dispatch) => { // По сути 3 действия делает redux thunk
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))

}
                                    // Передал сюда это лол
export const fetchFilters = (request, setFilters) => (dispatch) => {
    request('http://localhost:3001/filters')
        .then(res => {
            // Установим локально
            setFilters(res)
            // и в глобальный стейт
            dispatch(filtersLoading(res))
        })
        .catch(error => console.error(`Не получилось фетчануть фильтры ошибка ${error}`))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroRemoving = (id) => {
//     return {
//         type: 'HERO_DELETING',
//         payload: {
//             id
//         }
//     }
// }

// export const heroAdding = (newHero) => {
//     return {
//         type: 'HERO_ADDING',
//         payload: {
//             newHero
//         }
//     }
// }

// export const filtersLoading = (filters) => {
//     return {
//         type: 'FILTERS_LOADING',
//         payload: {
//             filters
//         }
//     }
// }

// export const selectFilter = (filter) => {
//     return {
//         type: 'SET_FILTER',
//         payload: {
//             filter
//         }
//     }
// }

// export const selectFilter = (filter) => (dispatch) => { //Тут ебашит redux thunk
//     setTimeout(() => {
//         dispatch({
//             type: 'SET_FILTER',
//             payload: {
//                 filter
//             }
//         })
//     }, 500)
// }