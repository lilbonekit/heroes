

import {v4 as uuidv4} from 'uuid';
import { useState, useEffect } from 'react'
import useInput from "../../hooks/useInput";
import { useDispatch } from 'react-redux';
import { heroAdding } from '../../actions';
import { useHttp } from '../../hooks/http.hook';
// Задача для этого компонента: ✅
// Реализовать создание нового героя с введенными данными. Он должен попадать ✅
// в общее состояние и отображаться в списке + фильтроваться ✅
// Уникальный идентификатор персонажа можно сгенерировать через uiid ✅
// Усложненная задача: ✅
// Персонаж создается и в файле json при помощи метода POST ✅
// Дополнительно: ✅
// Элементы <option></option> желательно сформировать на базе ✅
// данных из фильтров ✅

const HeroesAddForm = () => {
    // Запишем в стейт фильтры
    const [filters, setFilters] = useState(null)

    // диспатч
    const dispatch = useDispatch();

    // будем постить данные
    const { request } = useHttp()

    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(res => setFilters(res))
            .catch(error => console.error(`Не получилось фетчануть ошибка ${error}`))
    }, [])


    // Используем кастомный хукич
    const nameInput = useInput('')
    const descInput = useInput('')
    const selectInput = useInput('earth')

    const onFormSubmit = (e) => {
        e.preventDefault()

        // Формируем объект с ньюебеланс героем
        const newHero = {
            name: nameInput.inputValue,
            description: descInput.inputValue,
            element: selectInput.inputValue,
            id: uuidv4()
        }

        postData(newHero)

        dispatch(heroAdding(newHero))

        nameInput.clear()
        descInput.clear()
        selectInput.clear()
    }

    const postData = (data) => {
        const dataJSON = JSON.stringify(data)
        request(`http://localhost:3001/heroes/`, 'POST', dataJSON)
            .then(() => console.log('Успешно отправлено на сервер'))
            .catch(() => console.log('Неуспешно отправлено на сервер'))
    }

    const renderFilters = heroesFilter(filters)

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    onChange={nameInput.onValueChange}
                    value={nameInput.inputValue} 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={descInput.onValueChange}
                    value={descInput.inputValue} 
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    onChange={selectInput.onValueChange}
                    value={selectInput.inputValue} 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    {/* <option >Я владею элементом...</option> */}
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                    {renderFilters}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

const heroesFilter = (filtersDataArray) => {
    if (!filtersDataArray) {
        return null
    } else {
        return filtersDataArray.filter(el => el[0] !== 'all').map(filterData => (
            <option key={filterData[0]} value={filterData[0]}>{filterData[1]}</option>
        ));
    }
}

export default HeroesAddForm;