// import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';

const stringMiddleWare = () => next => action => {
    if(typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args)

//     const oldDispatch = store.dispatch
//     store.dispatch = (action) => {
//         if(typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }

//     return store
// }

// const store = createStore(
//     combineReducers({heroes, filters}),
//     compose(applyMiddleware(ReduxThunk, stringMiddleWare), 
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     )

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare), //Команда, чтобы подтянуть стандартные MW,
    devTools: process.env.NODE_ENV !== 'production' // Отключить редакс девтулзс в продакшине
})

export default store;