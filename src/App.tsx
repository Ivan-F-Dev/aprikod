import React from 'react';
import './App.css';
import todos from "./store/Todos";
import TodoList from "./components/TodoList/TodoList";
import TodoInfo from "./components/TodoInfo/TodoInfo"
import {observer} from "mobx-react-lite";

function App() {
    return (
        <div className="App">
            <TodoList
                addTodo={todos.addTodo}
                removeTodos={todos.removeTodo}
                editTodo={todos.editTodo}
                selected={todos.selectedList}
                setSelected={todos.setSelected}
                list={todos.list}
            />
            <TodoInfo todo={todos.list[0] || null}/>
        </div>
    );
}

export default observer(App);
