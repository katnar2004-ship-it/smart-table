import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // ✅ Первый аргумент — массив СТРОК с именами правил
    const compare = createComparison(
        ['skipEmptyTargetValues'],
        [
            rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
        ]
    );
    
    return (data, state, action) => {
        const searchValue = state[searchField]?.trim();
        
        // Если поиск пустой — возвращаем все данные
        if (!searchValue) return data;
        
        // ✅ Передаём target как объект с ключом поиска:
        // compare будет искать searchValue в полях ['date', 'customer', 'seller'] строки row
        return data.filter(row => compare(row, { [searchField]: searchValue }));
    }
}