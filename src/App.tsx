import React, {useState, useEffect} from 'react';
import s from './App.module.scss';
import todos from "./store/Todos";
import TodoList from "./components/TodoList/TodoList";
import TodoInfo from "./components/TodoInfo/TodoInfo"
import {observer} from "mobx-react-lite";

function App() {
    console.log('App', todos.list.length, todos.searchList.length)
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={s.App}>
            <button onClick={toggleTheme}>
                Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
            <TodoList
                search={todos.search}
                searchList={todos.searchList}
                addTodo={todos.addTodo}
                removeTodos={todos.removeTodo}
                selected={todos.selectedList}
                setSelected={todos.setSelected}
                chosenTodo={todos.chosenTodo}
                chooseTodo={todos.chooseTodo}
                list={todos.list}
            />
            <TodoInfo chosenTodo={todos.chosenTodo} addTodo={todos.addTodo} editTodo={todos.editTodo}/>
        </div>
    );
}

export default observer(App);
