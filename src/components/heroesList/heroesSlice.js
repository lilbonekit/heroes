import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

// Внутри createSlice, как и в createReducer, работает immer
// Нам нужно мутировать, а не возвращать объекты
// Либа сама позабоиться про иммутабельность
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload
        },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroAdding:  (state, action) => {state.heroes.push(action.payload)},
        heroRemoving: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)}
    }
})

const {actions, reducer} = heroesSlice

export default reducer

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroAdding,
    heroRemoving
} = actions