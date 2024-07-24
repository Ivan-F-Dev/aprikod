import React from 'react';
import {ITodo} from "../../store/Todos";
import Todo from "../Todo/Todo";
import s from "./TodoList.module.scss"

type Props = {
    list: ITodo[]
    addTodo: (id: string | undefined) => void
    removeTodos: () => void
    editTodo: (id: string, todo: ITodo) => void
    selected: string[]
    setSelected: (id: string) => void
};
const TodoList = ({list, addTodo, removeTodos, editTodo, selected, setSelected}: Props) => {
    const addTodoHandler = () => {
        addTodo(undefined)
    }

    return (
        <div className={s.TodoList}>
            <div className={s.TodoList__controls}>
                <button onClick={addTodoHandler}>Добавить</button>
                <button onClick={removeTodos}>Удалить выделенные</button>
            </div>
            {list.map(el => <Todo key={el.id} todo={el} selected={selected} setSelected={setSelected}/>)}
        </div>
    );
}

export default TodoList