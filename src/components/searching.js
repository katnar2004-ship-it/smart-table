import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison({
        skipEmptyTargetValues: true
    }, [
        rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
    ]);
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        if (action && action.name === 'search') {
            const searchValue = action.value || '';
            state[searchField] = searchValue;
        }
        
        // Если поиск пустой, возвращаем все данные
        if (!state[searchField] || state[searchField] === '') {
            return data;
        }
        
        // Применяем компаратор для фильтрации данных
        return data.filter(row => compare(row[searchField], state[searchField]));
    }
}