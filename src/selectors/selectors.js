// В отдельном файле, например, selectors.js
import { createSelector } from 'reselect';

const selectHeroes = state => state.heroes;
const selectFilters = state => state.filters;

const selectFilteredHeroes = createSelector(
  [selectHeroes, selectFilters],
  (heroes, filters) => {
    if (heroes.loadingStatus === "loading" || heroes.loadingStatus === "error") {
      return [];
    }
    
    if (filters.currentFilter === 'all') {
      return heroes.data;
    }
    
    return heroes.data.filter(hero => hero.element.includes(filters.currentFilter));
  }
);

export { selectFilteredHeroes };
