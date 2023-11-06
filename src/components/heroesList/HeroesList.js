import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroRemoving } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента: ✅
// При клике на "крестик" идет удаление персонажа из общего состояния ✅
// Усложненная задача:  ✅
// Удаление идет и с json файла при помощи метода DELETE ✅

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, currentFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onRemoveHero = (id) => {
        dispatch(heroRemoving(id))
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => console.log('Успешно удалено!'))
            .catch(() => console.log('Неуспешно удалено!'))
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0 || !currentFilter) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        // Чейнингом сначала фильтруем, а потом передаем, а потом внутри HeroesListItem отрисовываем
        return arr.filter(el => {
            if (currentFilter === 'all') {
                return true
            } else if(currentFilter !== 'all' && el.element.includes(currentFilter)) {
                return true
            }
            return false
        }).map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} id={id} onRemoveHero={onRemoveHero}/>
        })

    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;