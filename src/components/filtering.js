import { createComparison, defaultRules } from "../lib/compare.js";

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

    // @todo: #4.3 — настроить компаратор (перенесено внутрь функции)
    const compare = createComparison(defaultRules);

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
    const button = action; // action — это сам элемент кнопки
    const parent = button.closest('[data-field]') || button.parentElement;
    const input = parent?.querySelector('input, select');
    
    if (input) {
        input.value = '';
        const fieldName = button.dataset.field || input.name;
        if (fieldName) state[fieldName] = '';
    }
    return data; // вернёт все данные после сброса
}

        // @todo: #4.5 — отфильтровать данные используя компаратор
        // Фильтруем данные, используя текущее состояние state
        return data.filter(row => compare(row, state));
    }
}