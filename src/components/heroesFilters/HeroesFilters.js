
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {v4 as uuidv4} from 'uuid';

import { selectFilter } from "../../actions"

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const [filters, setFilters] = useState(null)
    // Это локально чтобы класс применился, 
    // но нам так же нужно в глобальном стейте сделать фильтрацию на основе этого выбора
    const [activeFilter, setActiveFilter] = useState('all')
    const state = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        setFilters(...state.filters)
    }, [state])

    const onFilterChange = (filterName) => {
        setActiveFilter(filterName)
        dispatch(selectFilter(filterName))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {heroesFilter(filters, activeFilter, onFilterChange)}
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

const heroesFilter = (filtersDataArray, activeFilter, onFilterChange) => {
    if (!filtersDataArray) {
        return null
    } else {
        return filtersDataArray.map(filterData => 
            <button
                key={uuidv4()}
                onClick={() => onFilterChange(filterData[0])} 
                className={`btn ${filterData[2]} ${activeFilter === filterData[0] ? 'active' : ''}`}>
                {filterData[1]}
            </button>
        );
    }
}

export default HeroesFilters;