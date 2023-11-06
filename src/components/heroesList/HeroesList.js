import './HeroesList.scss';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
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

    // Чуть доработал:
    // Во-первых, обернул в useCallback, так как мы будем передавать эту функцию ниже
    // Во-вторых, мы удаляем персонажа ТОЛЬКО, если запрос прошёл успешно!
    const onRemoveHero = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => console.log('Успешно удалено!'))
            .then(() => dispatch(heroRemoving(id)))
            .catch(() => console.log('Неуспешно удалено!'))
         // eslint-disable-next-line  
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0 || !currentFilter) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return (
            // Чейнингом сначала фильтруем, а потом передаем в map, а потом внутри HeroesListItem отрисовываем
            <TransitionGroup>
                {arr
                    .filter(el => (currentFilter === 'all' || el.element.includes(currentFilter)))
                    .map(({ id, ...props }) => (
                        <CSSTransition key={id} classNames="hero" timeout={300}>
                            <HeroesListItem key={id} {...props} id={id} onRemoveHero={onRemoveHero} />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        );
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;