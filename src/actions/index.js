import {filtersLoading} from '../components/heroesFilters/filtersSlice'

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
