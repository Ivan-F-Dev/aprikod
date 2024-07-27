import {ITodo} from "../../store/Todos";
import {v4 as uuidv4} from "uuid";

// Функция для редактирования задачи
export const editTodoUtil = (id: string, updatedTodo: ITodo, todos: ITodo[]): ITodo[] => {
    return todos.map(todo => {
        if (todo.id === id) {
            return { ...updatedTodo };
        } else {
            return {
                ...todo,
                childs: editTodoUtil(id, updatedTodo, todo.childs)
            };
        }
    });
};

// Функция для удаления задач по массиву id
export const removeTodoUtil = (ids: string[], todos: ITodo[]): ITodo[] => {
    return todos
        .filter(todo => !ids.includes(todo.id))
        .map(todo => ({
            ...todo,
            childs: removeTodoUtil(ids, todo.childs)
        }));
};

// Функция для добавления новой задачи
export const addTodoUtil = (todos: ITodo[], parentId: string | undefined, ): ITodo[] => {

    const newTodo: ITodo = {
        id: uuidv4(),
        title: 'Новая задача',
        text: 'Новая задача',
        childs: []
    };

    if (parentId === undefined) {
        return [newTodo,...todos]
    }

    return todos.map(todo => {
        if (todo.id === parentId) {
            return {
                ...todo,
                childs: [...todo.childs, newTodo]
            };
        } else {
            return {
                ...todo,
                childs: addTodoUtil(todo.childs, parentId)
            };
        }
    });
};

// Функция для для поиска/фильтрации задач
export const searchTodos = (
    searchText: string,
    todos: ITodo[],
    field: 'title' | 'text',
    includeNeighbours: boolean
): ITodo[] => {
    if (searchText === '') return []
    const search = (todos: ITodo[]): ITodo[] => {
        let result: ITodo[] = [];
        for (const todo of todos) {
            const matches = todo[field].toLowerCase().includes(searchText.toLowerCase());
            const filteredChildrens = search(todo.childs);

            if (matches || filteredChildrens.length > 0) {
                result.push({
                    ...todo,
                    childs: includeNeighbours ? todo.childs : filteredChildrens
                });
            }
        }
        return result;
    };

    return search(todos);
};