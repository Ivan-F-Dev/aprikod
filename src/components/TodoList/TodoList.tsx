import React, {useEffect, useState} from 'react';
import {ITodo} from "../../store/Todos";
import Todo from "../Todo/Todo";
import s from "./TodoList.module.scss"
import {debounce} from "../../shared/utils/debounce";

type Props = {
    list: ITodo[]
    searchList: ITodo[]
    search: (text: string, field?: 'title' | 'text', includeParents?: boolean) => void
    addTodo: (id: string | undefined) => void
    removeTodos: () => void
    selected: string[]
    setSelected: (id: string) => void
    chosenTodo: ITodo | null
    chooseTodo: (todo: ITodo) => void
};
const TodoList = ({
  list,
  addTodo,
  removeTodos,
  selected,
  setSelected,
  chosenTodo,
  chooseTodo,
  searchList,
  search
}: Props) => {
    console.log('TodoList')
    const search_ = debounce(search, 1000)

    const [searchText, setSearchText] = useState('')
    const [searchVariant, setSearchVariant] = useState<'text' | 'title'>('title')
    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        search_(e.target.value, searchVariant)
    }
    const resetHandler = () => {
        setSearchText('')
        search_('')
    }
    const variantHandler = () => {
        setSearchVariant((prev) => prev === 'text' ? 'title' : 'text')
    }

    useEffect(() => {
        search_(searchText,searchVariant)
    }, [list, searchVariant])

    const addTodoHandler = () => {
        addTodo(undefined)
    }

    return (
        <div className={s.TodoList}>
            <div className={s.TodoList__controls}>
                <button onClick={addTodoHandler}>Добавить</button>
                <button onClick={removeTodos}>Удалить выделенные</button>
            </div>
            <div className={s.TodoList__controls}>
                <input type="text" onChange={searchHandler} value={searchText}/>
                <button onClick={resetHandler}>сброс</button>
                <button onClick={variantHandler}>{searchVariant === 'title' ? 'поиск по заголовку' : 'поиск по описанию'}</button>
            </div>
            {searchList.length
                ? searchList.map(el => <Todo key={el.id} todo={el} selected={selected} setSelected={setSelected}
                                             chosenTodo={chosenTodo} chooseTodo={chooseTodo}/>)
                : list.map(el => <Todo key={el.id} todo={el} selected={selected} setSelected={setSelected}
                                       chosenTodo={chosenTodo} chooseTodo={chooseTodo}/>)
            }
        </div>
    );
}

export default TodoList