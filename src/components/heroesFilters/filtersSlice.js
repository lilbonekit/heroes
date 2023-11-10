import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentFilter: 'all',
    filters: []
}

// Внутри createSlice, как и в createReducer, работает immer
// Нам нужно мутировать, а не возвращать объекты
// Либа сама позабоиться про иммутабельность
const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersLoading: (state, action) => {
            state.filters = action.payload
        },
        selectFilter: (state, action) => {state.currentFilter = action.payload}
    }
})

const {actions, reducer} = filtersSlice

export default reducer

export const {
    filtersLoading,
    selectFilter
} = actions