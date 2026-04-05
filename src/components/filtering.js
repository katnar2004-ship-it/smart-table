import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);
export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    });
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
         if (action && action.name === 'clear') {
            // Находим родительский элемент кнопки
            const button = action.element; // предполагаем, что элемент кнопки передан в action
            const parent = button.parentElement;
            
            // Находим input рядом с кнопкой
            const input = parent.querySelector('input, select');
            if (input) {
                // Сбрасываем значение поля ввода
                input.value = '';
                
                // Получаем имя поля из data-field
                const fieldName = button.dataset.field;
                if (fieldName) {
                    // Сбрасываем соответствующее поле в state
                    state[fieldName] = '';
                }
            }
            return data;
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}