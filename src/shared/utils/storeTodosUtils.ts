// Функция для редактирования задачи
import {ITodo} from "../../store/Todos";
import {v4 as uuidv4} from "uuid";

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
        todos.unshift(newTodo)
        return todos
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